# Common Port Numbers

**Relevant Domains:** 2.1 (Network Security), 4.1 (Security Hardening), 4.3 (Security Monitoring)

---

## Why Port Numbers Matter on the Exam

The exam describes traffic by port and expects you to identify the protocol — and vice versa. Firewall rules, IDS alerts, log entries, and network diagrams all reference port numbers. You will not have a reference sheet.

The strategy is to learn ports in **logical groups**, not as a raw list.

---

## Group 1: File Transfer

| Port | Protocol | Notes |
|------|----------|-------|
| 20 | FTP (data) | Active mode data channel |
| 21 | FTP (control) | Commands and authentication — cleartext |
| 22 | SFTP / SCP | File transfer over SSH — encrypted |
| 69 | TFTP | Trivial FTP — UDP, no authentication, used for PXE boot and firmware |
| 445 | SMB | Windows file shares — also used by ransomware for lateral movement |

> **FTP vs. SFTP:** FTP (21) is unencrypted and should be disabled. SFTP (22) runs over SSH and is the secure replacement. Despite similar names, they are completely different protocols.

---

## Group 2: Remote Access

| Port | Protocol | Notes |
|------|----------|-------|
| 22 | SSH | Encrypted remote shell — replaces Telnet |
| 23 | Telnet | Unencrypted remote shell — never use on production systems |
| 3389 | RDP | Windows Remote Desktop — frequent target for brute-force and ransomware |

> **Exam trap:** Telnet (23) and SSH (22) do the same job — remote terminal access. Telnet sends credentials in cleartext. SSH encrypts everything. Seeing port 23 allowed on a firewall = hardening finding.

---

## Group 3: Email

| Port | Protocol | Notes |
|------|----------|-------|
| 25 | SMTP | Server-to-server mail delivery — also used to send mail |
| 110 | POP3 | Download mail to client, delete from server — cleartext |
| 143 | IMAP | Sync mail between client and server — cleartext |
| 465 | SMTPS | SMTP over SSL (older standard) |
| 587 | SMTP (submission) | Authenticated client mail submission — modern standard |
| 993 | IMAPS | IMAP over SSL/TLS — encrypted |
| 995 | POP3S | POP3 over SSL/TLS — encrypted |

> **Memory trick:** The secure versions of email ports are all in the 900s (993, 995) or near 500 (465, 587). Plain versions are small numbers (25, 110, 143).

---

## Group 4: Web Traffic

| Port | Protocol | Notes |
|------|----------|-------|
| 80 | HTTP | Unencrypted web traffic |
| 443 | HTTPS | Encrypted web traffic (TLS) |
| 8080 | HTTP (alternate) | Common for dev servers, proxies, and web app testing |
| 8443 | HTTPS (alternate) | Common for dev/admin web interfaces over TLS |

---

## Group 5: DNS and Directory Services

| Port | Protocol | Notes |
|------|----------|-------|
| 53 | DNS | UDP for queries, TCP for zone transfers — critical infrastructure |
| 389 | LDAP | Directory services (Active Directory queries) — cleartext |
| 636 | LDAPS | LDAP over SSL/TLS — encrypted |
| 88 | Kerberos | Authentication protocol used in Active Directory environments |

> **DNS on TCP vs. UDP:** DNS uses UDP/53 for normal queries (fast, small). It switches to TCP/53 for zone transfers (large data). An attacker requesting a zone transfer via TCP/53 is trying to enumerate every host in your DNS — a major recon technique.

---

## Group 6: Network Infrastructure

| Port | Protocol | Notes |
|------|----------|-------|
| 67/68 | DHCP | 67 = server, 68 = client — IP address assignment |
| 161/162 | SNMP | Network device monitoring — 161 queries, 162 traps (alerts) |
| 123 | NTP | Time synchronization — critical for log correlation and Kerberos |
| 179 | BGP | Border Gateway Protocol — internet routing between ISPs |

> **NTP (123) on the exam:** Accurate time is required for Kerberos authentication (tickets expire) and for log timestamps to be meaningful in an investigation. NTP attacks that skew time can break authentication or make logs unreliable.

---

## Group 7: Security-Specific Protocols

| Port | Protocol | Notes |
|------|----------|-------|
| 1194 | OpenVPN | Open source VPN — UDP typically |
| 1701 | L2TP | Layer 2 Tunneling Protocol — used with IPSec for VPNs |
| 1723 | PPTP | Point-to-Point Tunneling Protocol — older VPN, considered insecure |
| 500 | IKE / IPSec | Internet Key Exchange — VPN tunnel negotiation |
| 4500 | IPSec NAT-T | IPSec traversal through NAT |

---

## Group 8: Database Ports

| Port | Protocol | Notes |
|------|----------|-------|
| 1433 | Microsoft SQL Server | Frequent target — should never be exposed to the internet |
| 1521 | Oracle Database | Same rule — never internet-facing |
| 3306 | MySQL / MariaDB | Very common in web app stacks |
| 5432 | PostgreSQL | Common in enterprise and cloud apps |
| 27017 | MongoDB | NoSQL — historically exposed with no auth by default |

> **Exam context:** Databases listening on default ports that are reachable from the internet (or from the DMZ) are a hardening failure. The exam tests whether you can identify that a firewall rule allowing external access to port 3306 or 1433 is a misconfiguration.

---

## Group 9: Other Commonly Tested Ports

| Port | Protocol | Notes |
|------|----------|-------|
| 135 | RPC | Windows Remote Procedure Call — used by many Windows services |
| 137–139 | NetBIOS | Legacy Windows name resolution and file sharing — disable if not needed |
| 514 | Syslog | UDP — sending log data to a central syslog server |
| 6514 | Syslog over TLS | Encrypted syslog forwarding |
| 3128 | Squid Proxy | Common default port for web proxies |

---

## Cleartext vs. Encrypted — The Exam's Favorite Comparison

The exam loves to test whether you know which protocols send credentials in cleartext. If a question asks you to identify a hardening finding, look for these being allowed:

| Cleartext (bad) | Encrypted replacement (good) |
|----------------|------------------------------|
| FTP (21) | SFTP/SCP (22) |
| Telnet (23) | SSH (22) |
| HTTP (80) | HTTPS (443) |
| POP3 (110) | POP3S (995) |
| IMAP (143) | IMAPS (993) |
| SMTP (25) | SMTP submission (587) |
| LDAP (389) | LDAPS (636) |
| SNMP v1/v2 (161) | SNMP v3 (161, but with encryption) |

---

## Memorization Strategy

**Learn the exceptions, not the rules.** Most secure protocols run on high, memorable numbers (993, 995, 636, 443). Most insecure ones are small (23, 21, 110, 143, 389). When you see a small port number in a firewall rule, ask: "is there an encrypted version of this?"

**Learn the clusters:**
- 20/21 = FTP (data/control)
- 110/995 = POP3 (plain/secure)
- 143/993 = IMAP (plain/secure)
- 389/636 = LDAP (plain/secure)
- 161/162 = SNMP (query/trap)
- 67/68 = DHCP (server/client)

---

## Practice Questions

1. A firewall rule audit reveals that port 23 is permitted inbound from the internet to a network management server. What protocol does this allow, why is it a security concern, and what should replace it?

2. A penetration tester discovers that TCP port 53 is open on the target's DNS server and successfully performs a zone transfer. What information did they likely retrieve, and why is TCP/53 more dangerous than UDP/53 in this context?

3. During a log review, a SOC analyst sees repeated connection attempts from an external IP to port 3389 on multiple internal hosts. What protocol is being targeted, what type of attack is most likely occurring, and what hardening steps would reduce the risk?

4. A security architect is reviewing a web application stack. The application server communicates with a MySQL database. Which port should be firewalled from external access, and what rule of thumb applies to all database ports in a properly hardened architecture?

5. A network capture shows a workstation sending credentials over port 110 to retrieve email. What is the security concern, what is the encrypted alternative, and on what port does the secure version run?
