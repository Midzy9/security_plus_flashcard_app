# Security Investigation Logs

**Relevant Domains:** 4.3 (Security Monitoring and Analysis), 4.4 (Incident Response), 2.1 (Network Security)

---

## Why Logs Matter

In a security investigation, you rarely witness an attack in real time. Logs are the **forensic evidence trail** — they let you reconstruct what happened, when, and from where. The challenge isn't usually a lack of logs; it's knowing which logs answer which questions.

A useful mental model: think of an attacker moving through a kill chain. Different log types capture different **phases** of that movement.

**SIEM** (Security Information and Event Management) aggregates all log sources into one place for correlation and analysis. The exam will reference SIEM as the tool investigators use to query across log types simultaneously.

---

## Which Log Answers Which Question

| Investigative Question | Best Log Source |
|----------------------|----------------|
| Did an attacker get in from outside? | Firewall logs |
| Were credentials compromised? | Authentication logs |
| What malware ran on the machine? | Endpoint/EDR logs |
| Did malware call home? | DNS logs + Firewall logs |
| What data left the network? | Web proxy + Firewall (bytes out) |
| Was a web app attacked? | Application (web server) logs |
| Is there lateral movement? | Authentication logs + Endpoint logs |
| Is there DNS tunneling? | DNS logs |

---

## 1. Firewall Logs

**What they are:** Records of every connection attempt the firewall evaluated — allowed or denied.

**Where to find them:**
- Hardware firewalls (Palo Alto, Fortinet, Cisco ASA): vendor management console or syslog export
- Windows Defender Firewall: `Event Viewer → Windows Logs → Security` (Event IDs 5156, 5157)
- Linux `iptables`/`nftables`: `/var/log/syslog` or `/var/log/kern.log`
- **UFW (Linux):** also writes to `/var/log/syslog` with `[UFW BLOCK]` or `[UFW ALLOW]` tags
- Cloud: AWS Security Groups → VPC Flow Logs; Azure NSG Flow Logs

**Key fields in each record:**

| Field | What it tells you |
|-------|------------------|
| Source IP / port | Who initiated the connection |
| Destination IP / port | What they were trying to reach |
| Protocol | TCP, UDP, ICMP |
| Action | ALLOW or DENY |
| Timestamp | When it happened |
| Bytes transferred | How much data moved (large outbound = possible exfiltration) |

**What to look for in an investigation:**
- Repeated DENY from the same source → port scan or brute-force
- Allowed connection to an unusual port (e.g., outbound 4444, 1337) → C2 callback
- Large outbound data transfer to an unfamiliar IP → data exfiltration
- Internal host initiating outbound connections it never should → lateral movement or malware

### Reading UFW Log Entries (Real Example)

UFW logs via the Linux kernel into `/var/log/syslog`. Each blocked packet looks like:

```
[UFW BLOCK] IN=wlo1 OUT= MAC=<dst_mac>:<src_mac>:<ethertype> SRC=x.x.x.x DST=x.x.x.x PROTO=UDP SPT=<src_port> DPT=<dst_port>
```

| Field | Meaning |
|-------|---------|
| `IN=wlo1` | Arrived on the wireless interface |
| `OUT=` | Empty = inbound only, not being forwarded |
| `MAC=d8:80:83:...:08:00` | First 6 octets = destination NIC MAC; next 6 = sender's MAC |
| `SRC=` | IP that sent the packet |
| `DST=` | Your machine's IP |
| `SPT=` | Source port on the sender |
| `DPT=` | Destination port on your machine |
| `TTL=64` | Standard Linux/router default — one hop away |
| `PROTO=2` | Protocol 2 = IGMP (not TCP/UDP) |

**Real-world context — what "normal" noise looks like:**

- `SPT=1900` (SSDP/UPnP): Devices responding to a UPnP discovery broadcast your machine sent. Normal LAN traffic. UFW blocks the responses because there's no rule allowing inbound UDP on ephemeral ports.
- `SRC=0.0.0.0 DST=224.0.0.1 PROTO=2 TTL=1`: IGMP multicast from a router doing multicast group management. Link-local (TTL=1), completely normal.
- MAC addresses starting with `01:00:5e` are always multicast Ethernet addresses.

> **Exam note:** Port 1900/SSDP is a known attack surface. UPnP has a history of vulnerabilities (e.g., 2013 SSDP amplification DDoS). Disabling UPnP on routers is a standard hardening recommendation under objective 4.1.

> **Key analyst skill:** Firewall logs capture both malicious and benign traffic. Distinguishing them requires context — protocol, port, source, and pattern. A default-deny policy (all inbound blocked unless explicitly allowed) is correct behavior, not a problem.

---

## 2. Authentication Logs

**What they are:** Records of every login attempt — successful or failed — across systems and services.

**Where to find them:**
- **Windows:** `Event Viewer → Windows Logs → Security`
  - Event ID **4624** — Successful logon
  - Event ID **4625** — Failed logon
  - Event ID **4648** — Logon using explicit credentials (pass-the-hash indicator)
  - Event ID **4768/4769** — Kerberos ticket requests (domain environments)
- **Linux:** `/var/log/auth.log` (Debian/Ubuntu) or `/var/log/secure` (RHEL/CentOS)
- **Active Directory:** Domain Controller Security log, or forwarded to SIEM
- **Cloud/SaaS:** Azure AD Sign-in logs; AWS CloudTrail; Okta System Log; Google Workspace Admin Console

**Key fields:**

| Field | What it tells you |
|-------|------------------|
| Account name | Who logged in (or tried to) |
| Source IP | Where the attempt came from |
| Logon type | Interactive, network, remote desktop, service (Windows-specific) |
| Success/Failure | Outcome |
| Failure reason | Wrong password vs. account locked vs. account doesn't exist |
| Timestamp | When |

**What to look for:**
- Many failures followed by a success → successful brute-force
- Failures on accounts that don't exist → username enumeration
- Successful login at odd hours from a foreign IP → credential compromise
- Logon Type 3 (network) or Type 10 (remote interactive) from unusual hosts → lateral movement
- Multiple accounts failing from the same IP → **password spray** (low-and-slow brute force)

> **Password spray vs. brute force:** Brute force hammers one account with many passwords. Password spray tries one common password across many accounts — harder to detect because each account only fails once or twice.

### Reading auth.log Entries (Real Example)

**`pkexec` and privilege escalation for hardware access:**

```
pkexec[97149]: dsi: Executing command [USER=root] [TTY=unknown] [CWD=/home/dsi]
               [COMMAND=/usr/libexec/csd-backlight-helper --set-brightness 28800 ...]
pam_unix(polkit-1:session): session opened for user root(uid=0) by (uid=1000)
```

This is **not a suspicious root login**. `pkexec` is PolicyKit's execution tool — the desktop equivalent of `sudo`, designed for GUI applications that need temporary root access for one specific, authorized task. `csd-backlight-helper` (Cinnamon Settings Daemon) adjusts screen brightness, which requires writing to kernel interfaces. PolicyKit grants root for that one command and logs it.

```
dsi (uid=1000) → pkexec → PolicyKit grants privilege → csd-backlight-helper runs as root
```

**Sleep/wake cycle in auth.log:**

```
systemd-logind: Lid closed.           ← system goes to sleep
systemd-logind: Lid opened.           ← system wakes
systemd-logind: Operation 'sleep' finished.
cinnamon-screensaver-pam-helper: gkr-pam: unlocked login keyring  ← user entered password
```

**Cron sessions — why they look like root logins:**

```
CRON[98102]: pam_unix(cron:session): session opened for user root(uid=0) by (uid=0)
CRON[98103]: pam_unix(cron:session): session opened for user dsi(uid=1000) by (uid=0)
CRON[98103]: pam_unix(cron:session): session closed for user dsi
CRON[98102]: pam_unix(cron:session): session closed for user root
```

These are **not interactive logins**. The cron daemon runs as root and opens a PAM session for each job it executes. `by (uid=0)` means the cron daemon itself opened the session. The session opens and closes almost instantly — each one is just a scheduled task running. Always check the source (`CRON`, `sshd`, `login`, `su`) before treating a root session as suspicious.

> **CVE-2021-4034 ("PwnKit"):** `pkexec` had a privilege escalation vulnerability present for ~12 years that allowed any local user to gain root. A real-world example of a technical/preventive control becoming an attack surface — and why patch management is critical.

---

## 3. Endpoint / EDR Logs

**What they are:** The most detailed logs available — recorded at the operating system level on individual machines. EDR tools (CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne, Carbon Black) collect and analyze these at scale.

**Where to find them:**
- EDR platform console (cloud-based dashboards with search/query)
- **Windows Event Log:**
  - Event ID **4688** — Process creation (with command line if auditing enabled)
  - Event ID **7045** — New service installed
  - Event ID **4663** — Object (file) access
  - **Sysmon** (free Microsoft tool): adds rich process, network, and file event logging
- **Linux:** `auditd` → `/var/log/audit/audit.log`; `/proc` filesystem (see below)

**Key fields:**

| Field | What it tells you |
|-------|------------------|
| Process name + path | What ran, and from where |
| Parent process | What spawned it (e.g., Word spawning PowerShell = red flag) |
| Command line arguments | Exact command executed |
| File hash (MD5/SHA256) | Compare against threat intel databases |
| User context | Which account ran the process |
| Network connections | What the process connected to |
| Registry changes | Persistence mechanisms (Windows) |

**What to look for:**
- `powershell.exe` or `cmd.exe` spawned by `winword.exe` or `excel.exe` → macro-based malware
- Processes running from `%TEMP%`, `AppData`, or `/tmp` → malware staging
- Known-good process name running from unexpected path (e.g., `svchost.exe` in `C:\Users\`) → masquerading
- New scheduled tasks or services created → persistence
- Files written to `ADMIN$` or `C$` shares → lateral tool transfer

### The Linux `/proc` Filesystem

`/proc` is a **virtual filesystem** the kernel maintains in memory — not real files on disk. It's always live and always current. You don't "run" `/proc`; you read from it like any directory.

Every running process gets its own directory named by PID:

```bash
ls /proc/          # shows all PIDs as numbered directories
ls /proc/1234/     # everything about process 1234
```

**Quick reference — what's inside `/proc/<PID>/`:**

| File | What it contains | Security use |
|------|-----------------|--------------|
| `cmdline` | Exact command that launched the process | Spot processes running from /tmp or with suspicious arguments |
| `status` | Name, state, PID, PPID, UID, memory usage | Check who owns it and what spawned it |
| `exe` | Symlink to the binary on disk | Deleted binaries show as `(deleted)` — major red flag |
| `maps` | Memory regions mapped into the process | Detect injected code or unusual libraries |
| `fd/` | All open file descriptors | See what files/sockets the process has open |
| `net/tcp` | Active TCP connections (hex-encoded) | See what the process is connected to |
| `environ` | Environment variables at launch | May contain credentials or config paths |

**Practical example — inspecting a process:**

```bash
# Find a process by name and get its PID
pgrep -a python3

# Read its command line (null-separated, so convert with tr)
cat /proc/<PID>/cmdline | tr '\0' ' '

# Check who owns it, its parent, and memory use
cat /proc/<PID>/status | grep -E "Name|Pid|PPid|Uid|VmRSS|State"

# Confirm the actual binary it's running
ls -la /proc/<PID>/exe

# See its network connections
cat /proc/<PID>/net/tcp
```

**Using `$$` to inspect your own shell:**

```bash
echo $$                                    # prints your shell's PID
cat /proc/$$/status                        # your shell's metadata
cat /proc/$$/cmdline | tr '\0' ' '         # your shell's command line
ls -la /proc/$$/exe                        # what binary your shell is
```

`$$` is a shell variable that always holds the current shell's PID — no lookup needed.

**What investigators look for in `/proc`:**
- `exe` pointing to `/tmp`, `/dev/shm`, or showing `(deleted)` → malware that deleted itself after launch
- `PPid` showing a web server spawned a shell → web shell exploitation
- `net/tcp` showing unexpected outbound connections → C2 communication
- `Uid` of 0 on a process that shouldn't be root → privilege escalation

> **`/proc` vs. Windows EDR:** On Linux, `/proc` gives raw kernel-level visibility with no additional tools. On Windows, the equivalent data comes from the Win32 API (`OpenProcess`, `QueryFullProcessImageName`) — what Process Explorer and EDR agents query under the hood.

---

## 4. DNS Logs

**What they are:** Records of every DNS query made by hosts on your network — every time a device asked "what is the IP address of X?" Because DNS is infrastructure-level, it captures activity from every application on the machine, not just the browser.

**Where to find them:**

- **Linux (systemd-resolved):** Runs on `127.0.0.53`. Per-query logging requires enabling debug mode (`SYSTEMD_LOG_LEVEL=debug`) — not on by default. Queries are then visible in `journalctl -u systemd-resolved`.
- **Live capture (any Linux machine):** `sudo tcpdump -i <interface> -n port 53` — captures DNS traffic at the wire level in real time.
- **Internal DNS server:** Windows DNS Server logs (Event ID 3008, or DNS debug logging to a file); BIND → `/var/log/named/`
- **Network-level appliances:** Pi-hole, Cisco Umbrella, Infoblox — these are the tools enterprises use for DNS visibility across all devices
- **Cloud:** AWS Route 53 query logs; Azure DNS Analytics
- **Passive DNS (Zeek/Bro):** Network sensor that captures DNS from the wire across all hosts

> **Why endpoint DNS logging is insufficient for enterprise use:** A laptop's local resolver only sees its own queries, logs aren't tamper-resistant, and configuration changes (like debug mode) must be made per machine. Enterprise DNS visibility comes from infrastructure — a dedicated DNS server or inline appliance that sees all queries from all devices simultaneously.

**Key fields:**

| Field | What it tells you |
|-------|------------------|
| Querying host | Which machine asked |
| Domain queried | What they were looking up |
| Query type | A (IPv4), AAAA (IPv6), MX (mail), TXT, PTR (reverse lookup) |
| Response / resolved IP | What address they got back |
| NXDOMAIN | Non-existent domain — no answer returned |
| Timestamp | When |

**What to look for in an investigation:**

- **DGA (Domain Generation Algorithm):** Malware generates hundreds of random domain names and queries them, looking for the one the attacker has registered as the active C2. Indicator: high volume of NXDOMAIN responses from one host, domains with high-entropy names (`xkf92mq7.net`, `b4z9qrm2.biz`).
- **DNS tunneling:** Data encoded inside DNS queries to exfiltrate information or maintain a C2 channel — because DNS is rarely blocked by firewalls. Indicators: unusually long subdomain labels, TXT or NULL record queries, large response payloads, regular outbound queries to a single unusual domain.
- **C2 beaconing:** Malware checking in with its command server on a precise interval. Indicator: queries to the same domain at regular intervals (every 30s, every 5 min) — legitimate browsing is bursty and irregular, not metronomic.
- **Queries to newly registered or high-entropy domains** → compare against threat intel feeds
- **Direct queries to external DNS servers** (bypassing your internal resolver) → policy evasion or DNS tunneling

### Real-World Observation: One Page Load, Many Queries

A single page load in a browser generates **30–80+ DNS queries** — the HTML, JavaScript, fonts, analytics, CDN assets, and ad networks are each separate domains requiring separate lookups. This is normal. The patterns that indicate malicious activity cut through that noise:

| Benign pattern | Malicious pattern |
|---------------|------------------|
| Bursty — many queries at once, then silence | Regular interval — queries every N seconds like clockwork |
| Well-known domains (google.com, cloudflare.com) | High-entropy or newly registered domains |
| Mostly A/AAAA record queries | Unusual record types (TXT, NULL, large subdomains) |
| Mix of successes and NXDOMAINs | High NXDOMAIN ratio from a single host |
| Stops when user closes browser | Continues with no user activity |

---

## 5. Web Proxy Logs

**What they are:** If network traffic is routed through a proxy (common in enterprises), every HTTP/HTTPS request passes through it and is logged. Unlike firewall logs, a proxy sees the **full URL** — not just the destination IP and port.

**Where to find them:**
- **Enterprise proxies:** Zscaler, Blue Coat/Symantec Web Security, Cisco Web Security Appliance
- **Open source:** Squid → `/var/log/squid/access.log`
- **SIEM integration:** Proxy logs are typically forwarded for cross-source correlation

**Key fields:**

| Field | What it tells you |
|-------|------------------|
| Client IP | Which internal host made the request |
| Full URL | Exact resource requested — including path and query string |
| HTTP method | GET (fetch), POST (submit data), PUT (upload) |
| HTTP status code | 200 OK, 302 redirect, 403 forbidden, 404 not found |
| Response size (bytes) | Amount of data returned — or sent |
| User agent | Browser or software making the request |
| Destination IP | Resolved IP of the destination |
| MIME type | What type of content was returned |

**What to look for:**

- **C2 beaconing:** Regular interval POST or GET requests to the same external host — consistent timing, small payload, no user browsing pattern
- **Data exfiltration:** Large POST requests to external hosts, especially non-business destinations
- **Unusual user-agent strings:** Automated tools or malware masquerading as a browser (or making no attempt to disguise itself)
- **Connections to IP addresses directly** (no domain name in the URL) → attacker bypassing DNS to avoid detection
- **Access to file-sharing or paste sites** (pastebin, hastebin) → staging or exfiltrating data
- **Connections to Tor exit nodes or anonymization services**
- **SQL injection or traversal attempts in URLs:** `?id=1' OR 1=1--`, `/../../../etc/passwd`

> **Proxy vs. firewall logs:** A firewall sees `SRC=10.0.0.5 DST=1.2.3.4 DPT=443` — destination IP and port only. A proxy sees `POST https://evil.example.com/c2/upload.php` — the full intent of the request. For HTTP/HTTPS investigation, proxy logs are far more useful than firewall logs alone.

---

## 6. Application Logs

**What they are:** Logs generated by specific applications — web servers, databases, email servers, custom business apps. These capture what happened **inside** the application, beyond what the network can see.

**Where to find them:**

| Application | Log location |
|-------------|-------------|
| Apache | `/var/log/apache2/access.log`, `error.log` |
| Nginx | `/var/log/nginx/access.log`, `error.log` |
| IIS (Windows) | `C:\inetpub\logs\LogFiles\` |
| MySQL/MariaDB | `/var/log/mysql/mysql.log` (general query log) |
| PostgreSQL | `/var/log/postgresql/` |
| Microsoft SQL Server | SQL Server Management Studio → Management → SQL Server Logs |
| Email (Postfix) | `/var/log/mail.log` |
| Custom apps | Wherever the developer wrote them — `/var/log/`, `C:\Logs\`, or the app's own config |

**Key fields (web server access log):**

| Field | What it tells you |
|-------|------------------|
| Client IP | Source of the request |
| Timestamp | When |
| HTTP method + URL | Exactly what was requested |
| Status code | Success, error, or redirect |
| Bytes sent | Response size |
| Referrer | What page linked to this resource |
| User agent | Browser or tool |

**A typical Apache access log line:**
```
192.168.1.50 - - [02/Jun/2026:19:45:01 +0000] "GET /admin/login.php HTTP/1.1" 200 4523 "-" "Mozilla/5.0..."
```

**What to look for:**

- **SQL injection attempts:** URL parameters containing `'`, `UNION SELECT`, `OR 1=1`, `--`, `SLEEP(5)`
- **Directory traversal:** `../../../../etc/passwd` or `..%2F..%2F` in URL paths
- **Web shell access:** Requests to unusual `.php` files in upload directories, especially with command parameters
- **Brute-force against login pages:** Repeated POST requests to `/login`, `/admin`, `/wp-login.php` from the same IP
- **Scanning behavior:** Sequential requests to many different paths in rapid succession (404 storm)
- **Spike in HTTP 500 errors:** Application being probed or actively exploited
- **Database logs — unexpected bulk queries:** Large SELECT pulling entire tables, or bulk DELETE before ransomware deployment
- **Privileged API calls outside business hours:** Admin actions at 3am from an unfamiliar IP

> **Application logs capture what the network cannot see.** A firewall allows port 443 to your web server — it has no visibility into whether the request is legitimate or a SQL injection attempt. Application logs are the only source that records what happened at the application layer.

---

## Exam Tips

- **SIEM** aggregates all log sources — the exam references it as the central correlation tool
- **Log retention** matters: if logs roll over before an incident is discovered, the evidence trail is gone
- Logs give **visibility** — they require **correlation and analysis** to become actionable intelligence
- **Chain of custody** applies to logs in forensic investigations — preserve originals unmodified
- Always check the **source process** before treating a log entry as suspicious (`CRON` ≠ interactive login; `pkexec` ≠ unauthorized root access)
- Internal traffic is not automatically trustworthy — a default-deny firewall correctly blocks LAN traffic that wasn't explicitly requested
- **Proxy logs > firewall logs** for HTTP/HTTPS investigation — proxies see full URLs, firewalls only see IPs and ports
- **Application logs are the only source** that captures what happened inside the application — SQL injection, authentication bypass, and web shell activity are invisible to the network

---

## Practice Questions

1. A security analyst is reviewing firewall logs and notices that an internal workstation has been making outbound UDP connections to a public IP address on port 53 every 30 seconds, with the response payload growing larger over time. The workstation has no business reason to communicate with this IP. What attack technique does this pattern suggest, and which log source would you cross-reference to confirm it?

2. A threat hunter reviews authentication logs and finds 47 failed login attempts spread across 47 different user accounts from the same source IP, each using the password "Summer2024!". Only one attempt succeeded. What attack technique is this, and how does it differ from a traditional brute-force attack in terms of detection difficulty?

3. During an incident investigation on a Linux system, a responder runs `ls -la /proc/3847/exe` and sees the output: `/proc/3847/exe -> /tmp/.x (deleted)`. What does this tell the investigator about the process, and why is this a significant finding?

4. A Windows event log shows Event ID 4688 with the following parent/child relationship: `winword.exe` spawned `powershell.exe -enc <base64 string>`. What type of attack does this indicate, and what control category and function does an EDR tool that detects and terminates this process represent?

5. A SOC analyst notices that a firewall log entry shows `[UFW BLOCK] SRC=192.168.1.50 DST=192.168.1.100 PROTO=TCP DPT=22` repeating hundreds of times per minute from the same source. The source IP belongs to an internal workstation. What are two possible explanations for this activity, and which log source would you check next to determine whether credentials were successfully used?

6. A DNS analyst observes that a single workstation generated over 400 NXDOMAIN responses in one hour, all for domains with names like `q9f2mxk7.biz`, `r4tz8wq1.net`, and `h7b3pqx2.org`. No other host on the network shows this behavior. What malware mechanism does this indicate, and what is the attacker trying to accomplish with it?

7. A web proxy log shows the following entry repeated every 60 seconds from the same internal IP: `POST https://updates.legitimatelooking.com/check HTTP/1.1` with a response size of 43 bytes each time. No other traffic goes to this domain, and the user-agent string is `Mozilla/4.0 (compatible)` — an outdated value no modern browser uses. What does this pattern suggest, and what two fields in the proxy log are the strongest indicators?

8. A database administrator reviewing MySQL query logs notices the following entry originating from the web application's service account: `SELECT * FROM users` followed immediately by `SELECT * FROM credit_cards` — queries that the application has no business logic to perform. What two possible scenarios could explain this, and which log source would you correlate with to determine whether the queries were initiated by a human or by automated exploitation?
