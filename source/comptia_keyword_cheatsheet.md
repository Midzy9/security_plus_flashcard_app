# CompTIA Keyword Cheat Sheet (All 28 Objectives)

**Relevant Domains:** 1.1–5.6 (all)

## Core Idea

Security+ questions are often decided by **which keyword in the stem maps to which official term**, not by first-principles reasoning. This sheet gives one table per sub-objective: the cue words to look for in a stem, and the CompTIA term they point to. The objective headings and terms come from the official SY0-701 objectives PDF (V7.0). The cue words are tutoring heuristics, not official CompTIA text.

**How to use it:**
- Read the stem for **noun phrases and qualifiers** (e.g., "reuse," "quarterly," "can't be patched," "without the user clicking"). Those are the cues.
- When two answers both fit, pick the one that matches the **most specific named term** in the objectives.
- Watch for distractors pulled from a **sibling sub-item** of the same objective (ownership vs. classification, sanitization vs. destruction). See the Lookalikes section at the end.
- **Completeness:** every official sub-item in the objectives PDF appears in **bold** at least once in its objective's table (checked term by term with a script). The original version only covered the troublesome terms.
- Companion: the **Collision Terms** table in [objectives_coverage.md](objectives_coverage.md) tracks terms filed under an unexpected objective.

---

## 1.0 General Security Concepts (12%)

### 1.1 Security controls

| Stem says... | Answer |
|---|---|
| policy, risk assessment, governance, documented plan, security strategy | **Managerial** |
| carried out by people: guards, awareness training, procedures staff follow | **Operational** |
| firewall, antivirus, OS setting, encryption, enforced by a system | **Technical** |
| fence, lock, badge reader, bollard, guard shack, cameras | **Physical** |
| block, stop, prevent from happening | **Preventive** |
| discourage, warning sign, "may not stop it but makes them think twice" | **Deterrent** |
| identify, record, alert, log, motion sensor, after or during the event | **Detective** |
| restore, fix, recover after the incident, restore from backup | **Corrective** |
| alternative, can't implement the primary control, temporary measure, workaround | **Compensating** |
| instruct, direct, "authorized personnel only," policy telling people what to do | **Directive** |

### 1.2 Fundamental security concepts

| Stem says... | Answer |
|---|---|
| only authorized people can read it, encryption, secrecy | **Confidentiality** |
| not modified, hashing, tampering | **Integrity** |
| uptime, redundancy, accessible when needed | **Availability** |
| can't deny sending/signing, proof of origin, digital signature | **Non-repudiation** |
| prove who you are, login, credentials | **Authentication** |
| what you're allowed to access, permissions | **Authorization** |
| record of what was done, resources used, logging activity | **Accounting** |
| device certificate, machine identity, authenticating a server/device | **Authenticating systems** |
| compare current state to desired state/framework/baseline, "where are we vs. where we need to be" | **Gap analysis** |
| never trust, always verify; no implicit trust based on network location | **Zero Trust** |
| makes the grant/deny decision | **Policy Engine** (control plane) |
| communicates the decision, issues tokens/credentials to the PEP | **Policy Administrator** (control plane) |
| gatekeeper that enforces the decision in the traffic path | **Policy Enforcement Point** (data plane) |
| identity checked with context (location, device, behavior) | **Adaptive identity** |
| limit entry points, reduce what can be reached | **Threat scope reduction** |
| stop vehicles, posts in front of entrance | **Bollards** |
| tailgating/piggybacking, two doors, one opens at a time | **Access control vestibule** (mantrap) |
| body heat | **Infrared** sensor |
| weight on floor/mat, force on window | **Pressure** sensor |
| larger area, detects movement, microwave pulses | **Microwave** sensor |
| sound waves, echo | **Ultrasonic** sensor |
| fake system to attract attackers | **Honeypot** |
| multiple fake systems / fake network | **Honeynet** |
| fake file (e.g., "passwords.txt") that alerts when opened | **Honeyfile** |
| fake credential, API key, or data record that's traceable if used | **Honeytoken** |
| prove a person's identity: passwords, biometrics, MFA | **Authenticating people** |
| how access is decided after login (DAC/MAC/RBAC/ABAC) | **Authorization models** |
| Zero Trust decision side: adaptive identity, policy engine/administrator | **Control Plane** |
| Zero Trust traffic side, where access is enforced | **Data Plane** |
| access decided by centrally defined policy, not network location | **Policy-driven access control** |
| area where traffic is trusted without further checks (Zero Trust shrinks these) | **Implicit trust zones** |
| the user/device requesting access in Zero Trust | **Subject/System** |
| perimeter barrier, define a boundary, keep people out | **Fencing** |
| CCTV, cameras recording an area | **Video surveillance** |
| human who can make judgment calls, verify identity in person | **Security guard** |
| ID card, proximity/smart card to open doors | **Access badge** |
| illuminate the area, deter intruders, help cameras see | **Lighting** |
| automatically detect presence/motion (infrared/pressure/microwave/ultrasonic) | **Sensors** |
| fake resources to deceive or slow attackers and gather intel | **Deception and disruption technology** |

### 1.3 Change management

| Stem says... | Answer |
|---|---|
| change advisory board (CAB), sign-off before the change | **Approval process** |
| person who manages the change, responsible for the process | **Ownership** |
| people/departments affected by the change | **Stakeholders** |
| risk of making the change (and of not making it), what could break | **Impact analysis** |
| tested in a sandbox/lab first, results documented | **Test results** |
| rollback, revert if it fails, undo plan | **Backout plan** |
| off-hours, scheduled time with least business impact | **Maintenance window** |
| documented routine steps everyone follows | **Standard operating procedure (SOP)** |
| application/software needs updating on allowed or blocked lists | **Allow lists/deny lists** |
| limit the scope, don't touch anything outside the approved change | **Restricted activities** |
| change requires taking the service down | **Downtime** / **Service restart** / **Application restart** |
| old app nobody understands, fragile, undocumented | **Legacy applications** |
| changing one component requires changing others | **Dependencies** |
| update network diagrams/policies after the change | **Documentation** |
| track revisions, revert to a previous config | **Version control** |
| business-side change steps (approval, owner, stakeholders, impact, tests, backout, window, SOP) | **Business processes impacting security operation** |
| technical side effects (allow/deny lists, restarts, downtime, legacy, dependencies) | **Technical implications** |
| redraw network diagrams after the change | **Updating diagrams** |
| rewrite policies/procedures to match the change | **Updating policies/procedures** |

### 1.4 Cryptographic solutions

| Stem says... | Answer |
|---|---|
| third party holds a copy of the keys, recovery if key is lost | **Key escrow** |
| chip on the motherboard, boot integrity, BitLocker keys, per-device | **TPM** |
| high-volume, enterprise, dedicated crypto hardware, stores many keys, clustered | **HSM** |
| centralized management of keys across services/cloud | **Key management system** |
| isolated processor area, protects data in use, Apple Secure Enclave | **Secure enclave** |
| encrypt whole drive / one partition / one file / volume / database / single row | **Full-disk / Partition / File / Volume / Database / Record** encryption |
| protect SQL data from theft while the database is running ("in use") | **Database-level** encryption (FDE only protects powered-off/locked disks) |
| protect data moving across the network (TLS, VPN) | **Transport/communication** encryption |
| same key encrypts and decrypts, fast, bulk data | **Symmetric** |
| public/private key pair, slower, key exchange, signatures | **Asymmetric** |
| send to outside parties, only the recipient can read it, PGP/GPG/S/MIME email encryption | **Asymmetric**, encrypt with the **recipient's public key** |
| prove who sent it, non-repudiation, not modified | **Digital signature**, sign with the **sender's private key** |
| encrypt once for many recipients: bulk data with a symmetric session key, session key wrapped with each recipient's public key | **Hybrid encryption** (how PGP/S/MIME work under the hood; the exam answer is still **Asymmetric**) |
| securely agree on a shared key over an untrusted network, Diffie-Hellman | **Key exchange** |
| longer key = stronger, bits | **Key length** |
| hide data inside an image/audio file | **Steganography** |
| replace sensitive value with a token, credit card numbers, lookup/mapping | **Tokenization** |
| show only part of the data, `****-1234` | **Data masking** |
| one-way, fixed-length output, integrity check | **Hashing** |
| random value added before hashing, defeats rainbow tables | **Salting** |
| hash signed with sender's private key, integrity + non-repudiation | **Digital signatures** |
| hash many times to make weak passwords harder to crack, PBKDF2, bcrypt | **Key stretching** |
| distributed, tamper-evident chain of records | **Blockchain** / **Open public ledger** |
| entity that issues and signs certificates | **Certificate authority (CA)** |
| list of revoked certificates, downloaded periodically | **CRL** |
| real-time certificate status check (stapling = server attaches the response) | **OCSP** |
| not signed by a trusted CA, internal use, browser warning | **Self-signed** |
| signed by a public, trusted CA | **Third-party** certificate |
| inherently trusted starting point (root CA, TPM, HSM) | **Root of trust** |
| send public key + identity info to a CA to request a cert | **CSR generation** |
| `*.example.com`, covers all subdomains | **Wildcard** |
| framework of CAs, certificates and key pairs that establishes trust | **Public key infrastructure (PKI)** |
| shared openly; used to encrypt to someone or verify their signature | **Public key** |
| kept secret; used to decrypt or sign | **Private key** |
| AES, RSA, ECC, the specific cipher chosen | **Algorithms** |
| how much of the storage is encrypted (disk, partition, file...) | **Level (encryption)** |
| hardware/software that stores and protects keys (TPM, HSM, KMS, secure enclave) | **Tools** |
| digital document binding a public key to an identity | **Certificates** |
| hide the meaning of data (steganography, tokenization, masking) | **Obfuscation** |

---

## 2.0 Threats, Vulnerabilities, and Mitigations (22%)

### 2.1 Threat actors and motivations

| Stem says... | Answer |
|---|---|
| government-backed, APT, highest resources, espionage, war | **Nation-state** |
| script kiddie, uses others' tools, low skill | **Unskilled attacker** |
| political/social cause, website defacement, making a statement | **Hacktivist** |
| employee, contractor, already has access | **Insider threat** |
| profit, ransomware gangs, well-funded criminal group | **Organized crime** |
| employees using unapproved cloud apps/devices without IT's knowledge | **Shadow IT** |
| inside vs. outside the organization | **Internal/external** (attribute) |
| money, budget, backing | **Resources/funding** (attribute) |
| skill level | **Level of sophistication/capability** (attribute) |
| steal data out of the org | **Data exfiltration** (motivation) |
| spying, state or corporate secrets | **Espionage** |
| take systems offline | **Service disruption** / **Disruption/chaos** |
| threatening to release info unless paid | **Blackmail** |
| disgruntled, fired employee | **Revenge** |
| authorized, white-hat, improve security | **Ethical** |
| money, profit | **Financial gain** |
| ideology, cause, political beliefs | **Philosophical/political beliefs** |
| cyberwarfare, attacks during military conflict | **War** |

### 2.2 Threat vectors and attack surfaces

| Stem says... | Answer |
|---|---|
| email / SMS / instant messaging as the delivery channel | **Message-based** |
| malicious code hidden in an image (e.g., SVG) | **Image-based** |
| malicious PDF, Office macro, attachment file | **File-based** |
| phone call | **Voice call** (vishing) |
| USB drive left in the parking lot | **Removable device** |
| software with flaws; client-based (installed agent) vs. agentless | **Vulnerable software** |
| end-of-life, vendor no longer patches | **Unsupported systems and applications** |
| open Wi-Fi, unprotected wired jack, Bluetooth | **Unsecure networks** |
| unnecessary listening services | **Open service ports** |
| admin/admin, factory password never changed | **Default credentials** |
| MSP, vendor, or supplier compromised to reach you | **Supply chain** |
| deceptive email | **Phishing** |
| deceptive voice call | **Vishing** |
| deceptive text message | **Smishing** |
| false info spread on purpose (disinfo) or by mistake (misinfo) | **Misinformation/disinformation** |
| pretending to be someone else | **Impersonation** |
| fake CEO/vendor email asking for wire transfer or invoice change | **Business email compromise (BEC)** |
| made-up backstory to gain trust | **Pretexting** |
| infect a website the target group regularly visits | **Watering hole** |
| fake site/email copying a company's branding | **Brand impersonation** |
| misspelled domain (e.g., `gooogle.com`) | **Typosquatting** |
| phishing link sent by email / text / chat app | **Email / SMS / Instant messaging (IM)** |
| attacker gets in through your managed service provider's access | **Managed service providers (MSPs)** |
| software/service vendor compromised | **Vendors** |
| hardware or parts supplier compromised, counterfeit/tampered hardware | **Suppliers** |
| vulnerability needs installed software on the client vs. none needed | **Client-based vs. agentless** |
| open Wi-Fi / unprotected network jack / Bluetooth pairing | **Wireless / Wired / Bluetooth** |
| tricking people rather than technology | **Human vectors/social engineering** |
| phishing aimed at a senior executive (CEO, CFO), any payload | **Whaling** (most specific term beats "phishing") |
| phishing aimed at a specific person/group using researched details | **Spear phishing** |
| tactic: claims power over the victim (HR, IT, executive, police), new hire eager to impress | **Authority** |
| tactic: "ASAP," deadline, act now or lose access | **Urgency** |
| tactic: references people, events or relationships the victim knows (shared conference, named colleague) | **Familiarity** |

### 2.3 Vulnerability types

| Stem says... | Answer |
|---|---|
| inject code into another process's memory | **Memory injection** |
| more data than the buffer holds, overwrites memory | **Buffer overflow** |
| timing gap between checking and using a resource (TOCTOU) | **Race condition** (TOC/TOU) |
| trusted vendor's update was compromised | **Malicious update** |
| `' OR 1=1 --`, database query manipulated | **SQL injection (SQLi)** |
| script runs in other users' browsers, malicious JavaScript | **Cross-site scripting (XSS)** |
| flaw in device firmware | **Firmware** |
| manufacturer no longer supports / no more updates | **End-of-life** |
| old system still in use, outdated but may still run | **Legacy** |
| break out of a VM to the host or other VMs | **VM escape** |
| memory/storage not cleared between VMs | **Resource reuse** |
| weak algorithm, bad implementation, expired cert | **Cryptographic** |
| default settings, open cloud storage bucket, wrong permissions | **Misconfiguration** |
| install apps from outside the official app store | **Side loading** |
| remove iOS restrictions (rooting = Android) | **Jailbreaking** |
| unknown to vendor, no patch exists yet | **Zero-day** |
| bugs in a program's code | **Application** |
| flaw in Windows/Linux itself, OS patches | **Operating system (OS)-based** |
| flaws in websites/web apps (SQLi, XSS) | **Web-based** |
| flaws in physical devices (firmware, EOL, legacy) | **Hardware** |
| flaws in hypervisors/VMs | **Virtualization** |
| misconfigured cloud storage, insecure cloud APIs, cloud-only issues | **Cloud-specific** |
| compromise through a service, hardware or software provider | **Supply chain (Service / Hardware / Software provider)** |
| phone-specific weaknesses (side loading, jailbreaking) | **Mobile device** |

### 2.4 Indicators of malicious activity

| Stem says... | Answer |
|---|---|
| files encrypted, demand for payment | **Ransomware** |
| disguised as legitimate software | **Trojan** |
| self-replicating, spreads across the network with no user action | **Worm** |
| needs a user to run it, attaches to files | **Virus** |
| secretly monitors activity, collects info | **Spyware** |
| unwanted preinstalled apps | **Bloatware** |
| records keystrokes | **Keylogger** |
| triggers on a date/event (e.g., when an employee is removed from payroll) | **Logic bomb** |
| hides deep in the OS/kernel, hard to detect | **Rootkit** |
| forcing a door/lock | **Brute force** (physical) |
| copying an access badge | **RFID cloning** |
| attacking HVAC, power, fire suppression | **Environmental** |
| small request → huge response (DNS, NTP) | **Amplified DDoS** |
| spoofed source IP so responses hit the victim | **Reflected DDoS** |
| DNS poisoning, domain hijacking, redirected to wrong site | **DNS attacks** |
| evil twin, rogue AP, deauthentication | **Wireless** attacks |
| intercepts traffic between two parties | **On-path** |
| captured credentials or hash reused to log in | **Credential replay** |
| reuse a captured session/token | **Replay** |
| user gains admin rights | **Privilege escalation** |
| request made on behalf of a user/server (CSRF/SSRF) | **Forgery** |
| `../../etc/passwd` | **Directory traversal** |
| force a weaker protocol/cipher (SSL stripping) | **Downgrade** |
| two different inputs produce the same hash | **Collision** / **Birthday** |
| a few common passwords tried across many accounts (avoids lockout) | **Spraying** |
| many passwords tried against one account | **Brute force** (password) |
| many failed logins, user can't log in | **Account lockout** |
| same account logged in from multiple places at once | **Concurrent session usage** |
| user/system tried to reach something security blocked | **Blocked content** |
| logins from two distant locations too close in time | **Impossible travel** |
| CPU/bandwidth/disk spike | **Resource consumption** |
| files or services suddenly unavailable | **Resource inaccessibility** |
| log entries at unusual times | **Out-of-cycle logging** |
| attack details posted publicly | **Published/documented** |
| gaps in logs, attacker covering tracks | **Missing logs** |
| SQL, LDAP, command or script added to input | **Injection (application attack)** |
| oversized input crashes the app or runs attacker code | **Buffer overflow (application attack)** |
| malicious scripts delivered over the network (PowerShell, JavaScript, macros) | **Malicious code** |
| many systems flood one target | **DDoS** |

### 2.5 Mitigation techniques

| Stem says... | Answer |
|---|---|
| separate networks to limit spread, VLANs | **Segmentation** |
| rules listing who can access what | **Access control list (ACL)** / **Permissions** |
| only approved applications can run | **Application allow list** |
| move an infected device to its own network, quarantine | **Isolation** |
| apply vendor updates | **Patching** |
| watch for suspicious activity | **Monitoring** |
| only the minimum access needed for the job | **Least privilege** |
| check/force devices to match the required configuration | **Configuration enforcement** |
| retire, remove from service | **Decommissioning** |
| disable unused ports, change default passwords, remove unneeded software, host firewall, HIPS | **Hardening techniques** |
| encrypt data/devices | **Encryption** |
| install antivirus/EDR on hosts | **Installation of endpoint protection** |
| firewall running on the host itself | **Host-based firewall** |
| intrusion prevention on the host | **Host-based intrusion prevention system (HIPS)** |
| turn off unused ports/services (e.g., Telnet) | **Disabling ports/protocols** |
| change admin/admin | **Default password changes** |
| uninstall unused apps | **Removal of unnecessary software** |

---

## 3.0 Security Architecture (18%)

### 3.1 Architecture models

| Stem says... | Answer |
|---|---|
| who secures what (provider vs. customer) | **Responsibility matrix** (shared responsibility) |
| mixing private and public cloud, inconsistent security across both | **Hybrid considerations** |
| deploy infrastructure from templates/code, consistent and repeatable | **Infrastructure as code (IaC)** |
| no servers to manage, functions run on demand (FaaS) | **Serverless** |
| app broken into small independent services, API gateway | **Microservices** |
| vendor patches the OS and runtime; customer secures only code and its dependencies | **Serverless** (least customer patching) |
| patching responsibility depends on where it's hosted (VMs, self-managed or managed containers) | **Microservices** (a design pattern, not a hosting model) |
| physically disconnected network | **Air-gapped** (Physical isolation) |
| VLANs, separate networks over shared hardware | **Logical segmentation** |
| control plane separated from data plane, programmable network | **Software-defined networking (SDN)** |
| one central point of control vs. spread across locations | **Centralized vs. decentralized** |
| shares host OS kernel, lightweight, Docker | **Containerization** |
| hypervisor, each guest has its own OS | **Virtualization** |
| smart devices, sensors, weak default security | **IoT** |
| industrial plant, utilities, PLCs | **ICS/SCADA** |
| must respond within guaranteed time, deterministic | **RTOS** |
| purpose-built device, limited updates | **Embedded systems** |
| always up, redundant | **High availability** |
| moving risk to the cloud provider | **Risk transference** (consideration) |
| device can't be patched (embedded/ICS) | **Inability to patch** (consideration) |
| provider hosts the infrastructure (public/private/hybrid) | **Cloud** |
| outside providers you depend on | **Third-party vendors** |
| routers, switches, physical network design | **Network infrastructure** |
| org owns and runs its own data center | **On-premises** |
| uptime | **Availability (consideration)** |
| withstand and bounce back from disruption | **Resilience** |
| price | **Cost** |
| how quickly the system reacts | **Responsiveness** |
| grow/shrink with demand | **Scalability** |
| how quickly it can be rolled out | **Ease of deployment** |
| how quickly it can be restored | **Ease of recovery** |
| are patches available and how fast | **Patch availability** |
| electricity requirements | **Power** |
| processing capacity | **Compute** |

### 3.2 Securing enterprise infrastructure

| Stem says... | Answer |
|---|---|
| where to put a device on the network | **Device placement** |
| trusted/untrusted/screened areas | **Security zones** |
| all the points an attacker could target | **Attack surface** |
| device fails → traffic keeps flowing (availability wins) | **Fail-open** |
| device fails → traffic stops (security wins) | **Fail-closed** |
| can block traffic vs. only observe | **Active vs. passive** |
| in the traffic path vs. receives a copy | **Inline vs. tap/monitor** |
| hardened host used to administer devices in a secure zone | **Jump server** |
| intermediary between users and internet, caching, URL filtering | **Proxy server** |
| primary benefit of adding a proxy (security + client performance) | **Application-layer filtering** (plus **caching** for performance) |
| detects and alerts only | **IDS** |
| detects and blocks inline | **IPS** |
| spread traffic across servers | **Load balancer** |
| authenticate before a switch port allows traffic | **802.1X** (port security) + **EAP** |
| protects web apps from SQLi/XSS, HTTP traffic | **WAF** |
| all-in-one appliance, small business | **UTM** |
| application-aware firewall | **NGFW** / **Layer 7** |
| filters by IP and port only | **Layer 4** |
| SSL VPN, browser-based, port 443 | **TLS** tunneling |
| site-to-site VPN, AH/ESP, tunnel vs. transport mode | **IPSec** |
| VPN encrypting at the **packet level** (Layer 3), mutual authentication, low overhead | **IPSec with IKE** |
| negotiates IPSec keys/security associations and authenticates both peers | **IKE** (Internet Key Exchange) |
| both sides prove their identity to each other | **Mutual authentication** |
| legacy tunneling protocol with broken MS-CHAPv2 authentication | **PPTP** (obsolete; a distractor) |
| manage multiple WAN links to cloud apps efficiently | **SD-WAN** |
| cloud-delivered networking + security for remote users | **SASE** |
| how sites/devices connect (links, WAN, internet) | **Connectivity** |
| characteristics of a device: active/passive, inline/tap | **Device attribute** |
| jump server, proxy, IDS/IPS, load balancer, sensors | **Network appliances** |
| collect data for monitoring, feed the SIEM | **Sensors** |
| control what can connect to a switch port | **Port security** |
| authentication framework used with 802.1X | **Extensible Authentication Protocol (EAP)** |
| encrypted tunnel over a public network | **Virtual private network (VPN)** |
| users connecting into the network from outside | **Remote access** |
| wrap one protocol inside another | **Tunneling** |
| pick controls that fit the scenario's risk and needs | **Selection of effective controls** |

### 3.3 Protecting data

| Stem says... | Answer |
|---|---|
| governed by law/regulation (HIPAA, PCI DSS, GDPR) | **Regulated** (data type) |
| secret formula/process giving competitive advantage | **Trade secret** |
| patents, copyrights, designs | **Intellectual property** |
| contracts, court records | **Legal information** |
| bank/payment/account records | **Financial information** |
| readable by people vs. only by machines (barcode, encoded) | **Human- and non-human-readable** |
| ⚠️ the **classification** labels are a separate list → | **Public / Sensitive / Confidential / Restricted / Private / Critical** |
| stored on disk | **Data at rest** |
| moving across a network | **Data in transit** |
| in memory/CPU, being processed | **Data in use** |
| data subject to the laws of the country where it's stored | **Data sovereignty** |
| physical location of data or user | **Geolocation** |
| block access from certain countries/regions | **Geographic restrictions** |
| limit who can access (rather than transforming the data) | **Permission restrictions** |
| anyone may see it | **Public (classification)** |
| limited distribution, moderate harm if disclosed | **Sensitive** |
| serious harm if disclosed, need authorization | **Confidential** |
| highest sensitivity, strictest access | **Restricted** |
| personal information about individuals | **Private** |
| essential to operations, must stay available | **Critical** |
| make data unreadable without a key | **Encryption (method)** |
| one-way digest, e.g., stored passwords | **Hashing** |
| show only part of the value (****1234) | **Masking** |
| replace the value with a token | **Tokenization** |
| umbrella term for hiding/making data unclear | **Obfuscation** |
| put sensitive data on its own network/system | **Segmentation** |
| which laws govern data: where it's stored, PLUS laws reaching it via who it's about or who holds it | **Data sovereignty (multiple jurisdictions can apply)** |
| where data physically sits, e.g., choosing an EU cloud region | **Data residency** |
| a law requiring data to stay inside the country's borders | **Data localization** |

### 3.4 Resilience and recovery

| Stem says... | Answer |
|---|---|
| distribute load across active servers | **Load balancing** |
| servers share storage, one takes over if another fails | **Clustering** |
| fully equipped, ready immediately, most expensive | **Hot** site |
| some equipment, needs setup time | **Warm** site |
| empty space, cheapest, longest recovery | **Cold** site |
| sites spread far apart (avoid a single disaster) | **Geographic dispersion** |
| different OSes/vendors so one flaw doesn't hit everything | **Platform diversity** |
| multiple cloud providers | **Multi-cloud systems** |
| keep essential functions running during a disruption | **Continuity of operations (COOP)** |
| plan staff, technology, infrastructure for future demand | **Capacity planning** |
| discussion-based walkthrough around a table | **Tabletop exercise** |
| actually switch to backup systems | **Fail over** (testing) |
| drill, practice scenario (e.g., simulated phishing) | **Simulation** |
| run old and new systems at the same time | **Parallel processing** |
| point-in-time copy (often of a VM) | **Snapshot** |
| near-real-time copy to another location | **Replication** |
| log of changes used to recover | **Journaling** |
| short-term battery power, bridge to generator, clean shutdown | **UPS** |
| long-term power during an outage | **Generators** |
| backups at the same site vs. another location | **Onsite/offsite** |
| how often backups run | **Frequency** |
| protect the backup data itself | **Encryption (backups)** |
| restore from backup, test that restores work | **Recovery** |
| battery power, instant takeover, bridges the gap, minutes only | **UPS** |
| prolonged power so the UPS isn't exhausted; takes seconds to start | **Generator (complements the UPS)** |
| distributes power to rack equipment, a heavy-duty rack power strip | **Power distribution unit (PDU)** |
| remotely turn PDU outlets on/off, power-cycle a hung server | **Switched PDU** |
| servers with dual power supplies fed from separate PDUs/circuits | **Redundant (A/B) power feeds** |

---

## 4.0 Security Operations (28%)

### 4.1 Security techniques for computing resources

| Stem says... | Answer |
|---|---|
| approved standard config: define it → roll it out → keep it current | **Secure baselines** (Establish / Deploy / Maintain) |
| plan AP placement before installing | **Site survey** |
| visual map of Wi-Fi signal strength | **Heat map** |
| centrally manage/wipe/enforce policy on phones | **MDM** |
| employee owns the device | **BYOD** |
| company owns it, personal use allowed | **COPE** |
| employee picks from an approved list, company owns it | **CYOD** |
| latest Wi-Fi security, SAE | **WPA3** |
| centralized AAA for network/wireless logins | **RADIUS** |
| check/clean user input, stop injection | **Input validation** |
| cookie flagged to only travel over HTTPS | **Secure cookies** |
| review source code without running it | **Static code analysis** |
| verify who wrote the code and that it hasn't been modified | **Code signing** |
| run untrusted code in an isolated environment | **Sandboxing** |
| phones/tablets: MDM, updates, screen lock | **Mobile devices (hardening target)** |
| desktops/laptops: patches, remove local admin, host firewall, EDR | **Workstations** |
| disable unused ports, change defaults, SSH not Telnet | **Switches / Routers** |
| IAM least privilege, MFA on the console, secure configs | **Cloud infrastructure** |
| remove unneeded services, patch | **Servers** |
| often can't patch: segment, change default credentials | **ICS/SCADA / Embedded systems / RTOS / IoT devices** |
| cellular, Wi-Fi, Bluetooth on a mobile device | **Connection methods** |
| WPA3, AES/CCMP, GCMP | **Cryptographic protocols** |
| EAP, 802.1X | **Authentication protocols** |
| watch systems for issues | **Monitoring** |

### 4.2 Asset management

| Stem says... | Answer |
|---|---|
| buying from approved vendors, purchasing process | **Acquisition/procurement** |
| named person accountable for the asset | **Ownership** |
| label by sensitivity/criticality → consistent controls | **Classification** |
| list of what you own | **Inventory** |
| discover/scan to find all devices or software | **Enumeration** |
| remove data so media can be reused; wiping, degaussing, crypto-erase | **Sanitization** |
| shred, crush, pulverize, incinerate | **Destruction** |
| proof/document that disposal was done | **Certification** |
| how long data must be kept | **Data retention** |
| SSD/flash + degaussing | ❌ Doesn't work (magnetic media only) |

### 4.3 Vulnerability management

| Stem says... | Answer |
|---|---|
| automated scan for known flaws | **Vulnerability scan** |
| analyze code without running it | **Static analysis** |
| test the running app, fuzzing | **Dynamic analysis** |
| track third-party libraries/dependencies for flaws | **Package monitoring** |
| public sources | **OSINT** threat feed |
| paid feed | **Proprietary/third-party** |
| ISAC, sector sharing group | **Information-sharing organization** |
| stolen data/credentials for sale | **Dark web** |
| simulated attack to exploit flaws | **Penetration testing** |
| pay outside researchers for finding bugs | **Bug bounty program** |
| reported a vulnerability that isn't there | **False positive** |
| missed a real vulnerability | **False negative** |
| severity score 0–10 | **CVSS** |
| unique identifier for a known vulnerability | **CVE** |
| percent of asset value lost if exploited | **Exposure factor** |
| how much risk the org will accept for this flaw | **Risk tolerance** |
| cyber insurance to cover losses | **Insurance** (response) |
| can't patch, so use a different control | **Compensating controls** |
| formally approved to leave unpatched | **Exceptions and exemptions** |
| scan again after fixing | **Rescanning** (validation) |
| verify a finding is real | **Confirmation** |
| rank which vulnerabilities to fix first | **Prioritize** |
| categorize vulnerabilities by type/severity | **Vulnerability classification** |
| org-specific factors change severity (e.g., system is internal-only) | **Environmental variables** |
| effect on the business or industry | **Industry/organizational impact** |
| process for outside researchers to report vulnerabilities | **Responsible disclosure program** |
| review systems/processes for weaknesses | **System/process audit** |
| external intel about current threats | **Threat feed** |
| code-level testing (static, dynamic, package monitoring) | **Application security** |
| fix by applying vendor updates | **Patching** |
| isolate the vulnerable system on its own network | **Segmentation** |
| confirm the fix through audit or verification | **Audit / Verification** |
| document and communicate findings | **Reporting** |

### 4.4 Alerting and monitoring

| Stem says... | Answer |
|---|---|
| aggregate and correlate logs from many sources, alert | **SIEM** |
| standardized format to automate compliance/config checks | **SCAP** |
| CIS-style hardening standards to compare against | **Benchmarks** |
| software installed on the device vs. no install | **Agents/agentless** |
| stop sensitive data from leaving | **DLP** |
| device pushes an alert to a management station | **SNMP traps** |
| who talked to whom, how much, when, but no content | **NetFlow** |
| collect logs into one place | **Log aggregation** |
| store logs long-term | **Archiving** |
| too many false positives, adjust thresholds | **Alert tuning** |
| isolate the affected file or host | **Quarantine** |
| monitor servers/endpoints, apps, network devices | **Systems / Applications / Infrastructure** |
| notify on events | **Alerting** |
| check systems for vulnerabilities/config issues | **Scanning** |
| produce summaries of monitoring results | **Reporting** |
| malware detection on endpoints | **Antivirus** |
| find known vulnerabilities | **Vulnerability scanners** |
| act on an alert and confirm the fix worked | **Alert response and remediation/validation** |
| appliance can't run SIEM agents; device pushes logs to a listener | **Syslog (agentless, collector/listener)** |
| encrypted, reliable log transport | **Syslog over TLS (TCP 6514)** |
| plain syslog default port | **UDP 514** |
| syslog levels: 0 Emergency → 7 Debug; level N sends 0..N | **Syslog severity levels** |

### 4.5 Enhancing enterprise capabilities

| Stem says... | Answer |
|---|---|
| DMZ, public-facing servers isolated from the internal network | **Screened subnet** |
| public-facing (DMZ) servers initiating connections into the LAN | **Not allowed** (a compromised DMZ host would become a pivot) |
| enterprise LAN clients: initiate outbound, don't accept new inbound | **Correct zone behavior** (stateful firewall allows the replies) |
| guest zone | **Internet only**, never the enterprise LAN |
| printer/IoT (low-privilege) zone | **Accepts** jobs from the LAN, doesn't initiate |
| IDS/IPS matches known patterns | **Signatures** |
| IDS/IPS spots unusual patterns over time | **Trends** |
| filter web on the device (works off-site) | **Agent-based** web filter |
| all web traffic through one filter point | **Centralized proxy** |
| block by category (gambling, social media) | **Content categorization** |
| block based on site's known trustworthiness | **Reputation** |
| centrally push Windows settings via AD | **Group Policy** |
| Linux mandatory access control | **SELinux** |
| choose secure protocol (SSH over Telnet, SFTP over FTP) | **Protocol selection** / **Port selection** |
| block malicious domains at name resolution | **DNS filtering** |
| alert when critical system files change | **File integrity monitoring (FIM)** |
| check device health/posture before allowing network access | **NAC** |
| endpoint-focused detection and automated response | **EDR** |
| correlates across endpoints, network, cloud | **XDR** |
| baseline of normal user behavior, flag deviations | **User behavior analytics** |
| digital signature, public key in DNS | **DKIM** |
| list of authorized sending servers/IPs | **SPF** |
| policy (none/quarantine/reject) + reports | **DMARC** |
| filters inbound/outbound mail | **Email gateway** |
| allow/deny traffic based on criteria | **Rules (firewall)** |
| list of permitted/denied addresses | **Access lists** |
| allow/block specific ports and protocols | **Ports/protocols** |
| check URLs against known-bad lists | **URL scanning** |
| explicitly block certain sites/categories | **Block rules** |
| how data is sent securely (TLS, VPN) | **Transport method** |
| detect/stop sensitive data leaving | **DLP** |

### 4.6 Identity and access management

| Stem says... | Answer |
|---|---|
| create/remove accounts (onboarding/offboarding) | **Provisioning/de-provisioning** |
| verify a person's real identity before giving an account | **Identity proofing** |
| trust between organizations, log in with another org's identity | **Federation** |
| one login, many apps | **SSO** |
| directory service, query users/groups | **LDAP** |
| "allow this app to access your account," authorization delegation | **OAuth** |
| XML assertions between identity provider and service provider | **SAML** |
| systems working together across vendors | **Interoperability** |
| prove an authenticator/device is genuine | **Attestation** |
| labels/clearances, OS-enforced, military | **Mandatory (MAC)** |
| owner decides who gets access | **Discretionary (DAC)** |
| access by job role/group | **Role-based (RBAC)** |
| admin-defined conditions apply to everyone | **Rule-based** |
| "attributes and predefined rules," user characteristics + data sensitivity, fine-grained | **ABAC** (not rule-based, despite the word "rules") |
| combines many attributes (user, device, location, time - also attributes of the resources being accessed) | **Attribute-based (ABAC)** |
| only allowed during work hours | **Time-of-day restrictions** |
| password, PIN | **Something you know** |
| token, smart card, phone | **Something you have** |
| fingerprint, face | **Something you are** |
| GPS/IP location | **Somewhere you are** |
| FIDO key, YubiKey | **Security keys** |
| elevated rights granted only when needed, then removed | **Just-in-time permissions** |
| admin passwords stored and checked out from a vault | **Password vaulting** |
| short-lived, one-use credentials | **Ephemeral credentials** |
| login without a password (biometrics, keys) | **Passwordless** |
| eliminates passwords + verifies the **user**, credential bound to the device (passkey, Windows Hello, FIDO2) | **Passwordless** |
| what rights a user gets and the risk of too many (privilege creep) | **Permission assignments and implications** |
| minimum rights needed | **Least privilege** |
| longer = stronger | **Length (password)** |
| mix of character types | **Complexity** |
| can't use previous passwords, password history | **Reuse** |
| must change after N days | **Expiration** |
| minimum time before it can be changed again (stops cycling back) | **Age** |
| app that stores/generates unique passwords | **Password managers** |
| fingerprint/face scanner as the MFA method | **Biometrics** |
| hardware fob vs. authenticator app one-time codes | **Hard/soft authentication tokens** |
| JIT, vaulting, ephemeral creds for admin accounts | **Privileged access management tools** |
| same credentials typed into every app, each app checks the directory separately | **Same sign-on (LDAP alone), not SSO** |
| log in once, seamless access to many apps, even internal ones + integrates with LDAP/AD | **SAML (IdP backed by the directory)** |
| encrypted directory queries | **LDAPS (port 636); plain LDAP = 389** |
| central service that checks credentials once and vouches for the user to apps | **Identity provider (IdP)** |

### 4.7 Automation and orchestration

| Stem says... | Answer |
|---|---|
| auto-create accounts for new hires | **User provisioning** |
| auto-create servers/cloud resources | **Resource provisioning** |
| automated limits that stop risky actions | **Guard rails** |
| auto-open a ticket on an alert | **Ticket creation** |
| auto-route to a higher tier | **Escalation** |
| automated build/test pipeline | **Continuous integration and testing** |
| systems connected through APIs | **Integrations and APIs** |
| one person does the work of many | **Workforce multiplier** |
| automation respond faster to incidents | **Reaction time** |
| staff aren't burned out by repetitive work | **Employee retention** |
| automation itself becomes a single dependency | **Single point of failure** |
| quick fixes pile up into future maintenance burden | **Technical debt** |
| automatically add/remove resources to/from firewall-like groups | **Security groups** |
| turn services or access on/off automatically (e.g., disable account at termination) | **Enabling/disabling services and access** |
| saves time | **Efficiency/time saving** |
| automatically keep systems at baseline | **Enforcing baselines** |
| every deployment uses the same config | **Standard infrastructure configurations** |
| grow automatically without weakening security | **Scaling in a secure manner** |
| scripts need maintenance; who supports them later | **Ongoing supportability** |
| automation is harder to understand/troubleshoot | **Complexity** |
| costs money/time to build | **Cost** |

### 4.8 Incident response

| Stem says... | Answer |
|---|---|
| attack already discovered, attacker "suspected," exfiltration ongoing (select two) | **Analysis** (confirm/scope) + **Containment/eradication** (stop it); detection is done, recovery is premature |
| order of steps | **Preparation → Detection → Analysis → Containment → Eradication → Recovery → Lessons learned** |
| stop the spread, isolate | **Containment** |
| remove the malware/cause | **Eradication** |
| restore systems to normal | **Recovery** |
| post-incident review meeting | **Lessons learned** |
| find the underlying cause so it doesn't happen again | **Root cause analysis** |
| proactively search for threats already inside | **Threat hunting** |
| order to preserve data for litigation | **Legal hold** |
| documented record of who handled evidence | **Chain of custody** |
| collect evidence, most volatile first | **Acquisition** |
| keep evidence unchanged, copies/hashes | **Preservation** |
| gather electronic data for legal proceedings | **E-discovery** |
| plans, tools, team in place before an incident | **Preparation** |
| notice the incident (alerts, reports) | **Detection** |
| determine scope/severity, confirm it's real | **Analysis** |
| teach the IR team | **Training** |
| tabletop/simulation of the IR plan | **Testing** |
| collect and analyze evidence | **Digital forensics** |
| document forensic findings | **Reporting** |
| ransomware confirmed and actively spreading — what next? | **Containment (detection and analysis already done)** |
| isolate, quarantine, disable account, block IP | **Containment techniques (not phases)** |
| collect most short-lived evidence first: RAM before disk | **Order of volatility** |
| proactive search with no alert fired, assume breach | **Threat hunting** |

### 4.9 Data sources for investigations

| Stem says... | Answer |
|---|---|
| allowed/blocked connections | **Firewall logs** |
| rule triggered + timestamp + **interface** (eth0, WAN/LAN/DMZ) | **Firewall logs** |
| app errors, app-level events | **Application logs** |
| host/endpoint events, EDR | **Endpoint logs** |
| Windows Event Log logon events, Linux auth logs | **OS-specific security logs** |
| alerts on matched signatures | **IPS/IDS logs** |
| router/switch logs | **Network logs** |
| email headers, file properties, "data about data" | **Metadata** |
| summary view in real time | **Dashboards** |
| scheduled summaries generated by tools | **Automated reports** |
| full packet contents, Wireshark | **Packet captures** |
| scan results used as evidence | **Vulnerability scans** |
| unauthorized activity on **Linux** servers | **`/var/log/auth.log`** (or `/var/log/secure`) + **HIDS logs** + SIEM |
| Linux general system messages (excludes auth by default) | **`/var/log/syslog`** (Debian) / **`/var/log/messages`** (RHEL) |

---

## 5.0 Security Program Management and Oversight (20%)

### 5.1 Security governance

| Stem says... | Answer |
|---|---|
| recommendations, optional, best practice advice | **Guidelines** |
| high-level statement of what and why, mandatory | **Policies** |
| specific mandatory requirement (e.g., minimum password length) | **Standards** |
| step-by-step how-to | **Procedures** |
| step-by-step response for a specific incident type | **Playbooks** |
| rules for using company equipment | **Acceptable use policy (AUP)** |
| keep the business running during disruption | **Business continuity** |
| restore IT after a disaster | **Disaster recovery** |
| secure development process | **SDLC** policy |
| laws, industry rules, local → national → global | **External considerations** |
| board of directors / committees / government oversight | **Types of governance structures** |
| accountable for data, sets classification | **Owner** |
| decides why and how personal data is processed | **Controller** |
| processes data on behalf of the controller | **Processor** |
| day-to-day handling: backups, controls | **Custodian/steward** |
| general security rules for the org | **Information security policies** |
| how to respond to incidents | **Incident response (policy)** |
| how changes get approved (both a policy and a procedure) | **Change management** |
| account setup/removal when people join/leave | **Onboarding/offboarding** |
| specific mandatory requirements for passwords / access / physical / encryption | **Password / Access control / Physical security / Encryption standards** |
| periodically review and update policies | **Monitoring and revision** |
| keep guidelines/policies relevant (select two) | **Periodic assessments + regular review** (not "continually update") |
| top leadership setting direction | **Boards** |
| subgroup focused on one area (e.g., audit, risk) | **Committees** |
| agencies with oversight authority | **Government entities** |
| decisions made at HQ vs. by individual units | **Centralized/decentralized** |
| law / industry rules / city-state, country, international | **Regulatory / Legal / Industry / Local-regional / National / Global** |
| international standard for an information security management system (ISMS), certifiable | **ISO/IEC 27001** |
| guidance on implementing security controls (best practices) | **ISO/IEC 27002** |
| security controls for cloud services | **ISO/IEC 27017** |
| protecting PII in public clouds | **ISO/IEC 27018** |
| privacy management system, extension of 27001 | **ISO/IEC 27701** |
| risk management guidelines (any kind of risk) | **ISO 31000** |
| ISO number ending in -001 (9001, 14001, 27001) | **Core certifiable management system standard** |
| US digital identity / authentication assurance | **NIST SP 800-63** |

### 5.2 Risk management

| Stem says... | Answer |
|---|---|
| finding risks | **Risk identification** |
| as needed / regular schedule / once / always running | **Ad hoc / Recurring / One-time / Continuous** assessment |
| high/medium/low, heat map | **Qualitative** |
| dollar values, numbers | **Quantitative** |
| loss from one event (asset value × EF) | **SLE** |
| times per year | **ARO** |
| yearly expected loss (SLE × ARO) | **ALE** |
| document tracking risks, owners, status | **Risk register** |
| where a specific risk's likelihood, impact and existing countermeasures are documented | **Risk register** |
| grid/chart coloring risks by likelihood × impact | **Risk heat map** (a qualitative visual of the register) |
| metric warning that risk is rising | **Key risk indicator (KRI)** |
| person responsible for a specific risk | **Risk owner** |
| level that triggers action | **Risk threshold** |
| acceptable deviation from the plan | **Risk tolerance** |
| overall amount of risk willing to pursue; aggressive / cautious / balanced | **Risk appetite** (**Expansionary** / **Conservative** / **Neutral**) |
| balances mitigating risk and exploiting opportunity, **without bias** (even if called a "strategy") | **Neutral** |
| buy insurance, outsource | **Transfer** |
| leave as is, formally sign off (exception/exemption) | **Accept** |
| stop doing the risky activity | **Avoid** |
| add controls to reduce it | **Mitigate** |
| how long until back online | **RTO** |
| how much data loss is acceptable / backup frequency | **RPO** |
| average time to fix | **MTTR** |
| average time between failures, reliability | **MTBF** |
| chance of an event, as a number | **Probability** |
| chance in qualitative terms (rare, likely) | **Likelihood** |
| percent of asset value lost per event | **Exposure factor** |
| how bad the effect would be | **Impact** |
| communicate risks to leadership | **Risk reporting** |
| effect of a disruption on business functions (RTO/RPO/MTTR/MTBF) | **Business impact analysis (BIA)** |

### 5.3 Third-party risk

| Stem says... | Answer |
|---|---|
| contract allows us to audit the vendor | **Right-to-audit clause** |
| vendor shows its own audit results | **Evidence of internal audits** |
| outside party evaluates the vendor | **Independent assessments** |
| evaluate the vendor's suppliers | **Supply chain analysis** |
| research a vendor before choosing | **Due diligence** |
| relationships that could bias selection | **Conflict of interest** |
| uptime, response time guarantees | **SLA** |
| informal, non-binding statement of shared intent | **MOU** |
| more formal, defines conditions of cooperation | **MOA** |
| general terms for all future work | **MSA** |
| specific project deliverables, timeline, scope | **WO/SOW** |
| keep information confidential | **NDA** |
| partnership terms, shared responsibilities/profits | **BPA** |
| ongoing review of vendor performance | **Vendor monitoring** |
| send vendor a security survey | **Questionnaires** |
| defines what pen testers may and may not do | **Rules of engagement** |
| evaluating a vendor's security | **Vendor assessment** |
| test the vendor's security by pen test | **Penetration testing (vendor assessment)** |
| choosing a vendor | **Vendor selection** |

### 5.4 Security compliance

| Stem says... | Answer |
|---|---|
| reported to internal management vs. regulators | **Internal / External** compliance reporting |
| fines, sanctions, reputation hit, license revoked, contract breach | **Consequences of non-compliance** |
| investigating and understanding the risks | **Due diligence** |
| acting responsibly on what you know | **Due care** |
| employees sign that they read and understand a policy | **Attestation and acknowledgement** |
| automated compliance checks | **Automation** |
| the person the data is about | **Data subject** |
| decides purpose vs. carries out processing | **Controller vs. processor** |
| know what data you hold and how long to keep it | **Data inventory and retention** |
| request to erase personal data (GDPR) | **Right to be forgotten** |
| ongoing checks that requirements are met | **Compliance monitoring** |
| monitoring done by staff vs. outside parties | **Internal and external** |
| monetary penalty | **Fines** |
| restrictions imposed by governments/regulators | **Sanctions** |
| customers lose trust | **Reputational damage** |
| can no longer operate legally | **Loss of license** |
| breach of contract, lost business | **Contractual impacts** |
| privacy laws by jurisdiction | **Legal implications (Local/regional / National / Global)** |
| who owns the data | **Ownership** |
| GDPR: how soon to report a breach to the regulator | **Within 72 hours of becoming aware** |
| GDPR maximum fine | **€20M or 4% of global annual turnover, whichever is higher** |
| GDPR applies to a non-EU company because… | **It targets/monitors people located IN the EU (location, not citizenship)** |
| US healthcare breach notification to individuals | **HIPAA: within 60 days of discovery** |
| payment card standard enforced by card brands, not law | **PCI DSS (contractual impacts)** |
| deletion request vs. legal duty to keep records | **Right to be forgotten, applied with its legal-obligation exception** |

### 5.5 Audits and assessments

| Stem says... | Answer |
|---|---|
| formal statement/opinion that controls are effective | **Attestation** |
| board-level group overseeing audits | **Audit committee** |
| org evaluates itself | **Self-assessment** |
| required by a regulator | **Regulatory** |
| outside auditor with no ties to the org | **Independent third-party audit** |
| test locks, doors, badges | **Physical** pen test |
| red team, attack | **Offensive** |
| blue team, defend | **Defensive** |
| red + blue together (purple team) | **Integrated** |
| full knowledge given to testers (white box) | **Known environment** |
| some info given (gray box) | **Partially known environment** |
| no info given (black box) | **Unknown environment** |
| OSINT, no direct contact with target | **Passive** reconnaissance |
| scanning, directly touching the target | **Active** reconnaissance |
| audits run by the org itself | **Internal** |
| meeting requirements, checked internally | **Compliance** |
| internal check that practices align with laws/regulations/policies; find **noncompliance** | **Compliance** (internal), not generic self-assessment |
| audits run by outside parties | **External** |
| regulator's formal review | **Examinations** |
| outside evaluation of controls | **Assessment** |
| board needs assurance new controls work, before a public statement | **Internal audit** (reports to the audit committee) |
| audit for regulators, customers or partners (outside audiences) | **External audit** |

### 5.6 Security awareness

| Stem says... | Answer |
|---|---|
| just finished deploying/building the program or tool; next: run it and validate its effectiveness | **Execution** (deploying/building = development) |
| send simulated phishing emails to train staff | **Phishing campaigns** |
| teach staff the signs of a phish | **Recognizing a phishing attempt** |
| what to do with suspicious messages users report | **Responding to reported suspicious messages** |
| user deliberately doing something unsafe | **Risky** behavior |
| out-of-the-ordinary behavior | **Unexpected** behavior |
| honest mistakes | **Unintentional** behavior |
| written rules users must follow | **Policy/handbooks** |
| be aware of surroundings, shoulder surfing | **Situational awareness** |
| USB drives, unknown cables | **Removable media and cables** |
| protect info that could reveal operations (e.g., social media posts) | **Operational security** |
| working from home/coffee shops | **Hybrid/remote work environments** |
| training at hire vs. ongoing/quarterly | **Initial / Recurring** |
| building the program vs. running it | **Development / Execution** |
| spot employees who might be threats | **Insider threat** |
| strong passwords, password managers | **Password management** |
| manipulation tactics | **Social engineering** |
| recognize odd behavior | **Anomalous behavior recognition** |
| training topics | **User guidance and training** |
| track and report training results/incidents | **Reporting and monitoring** |

---

## Exam Traps: Lookalikes That Swap Places

| Pair | The cue that separates them |
|---|---|
| IDS vs. IPS | Alert only vs. block inline (and **HIDS/HIPS** when it's on a host) |
| Vector vs. impact | Vector is the *path* (USB, email); impact is the *result* (IP loss) |
| Sanitization vs. destruction | Data removed, media intact vs. media physically destroyed |
| Ownership vs. classification | Accountability vs. consistent controls |
| Virus vs. worm | Needs user action vs. self-spreading |
| Spraying vs. brute force | Many accounts, few passwords vs. one account, many passwords |
| End-of-life vs. legacy | Vendor stopped support vs. just old |
| Jailbreaking vs. side loading | Removing OS restrictions vs. installing outside the store |
| Encrypting vs. signing (which key?) | Encrypt with the **recipient's public** key (only they can open it) vs. sign with the **sender's private** key (proves who sent it) |
| Tokenization vs. masking | Replace with a token (reversible via mapping) vs. hide part of it |
| BYOD vs. COPE vs. CYOD | Who owns the device and who chose it |
| Policy vs. standard vs. procedure vs. guideline | Why vs. specific requirement vs. how-to steps vs. optional advice |
| Risk appetite vs. tolerance | Overall willingness vs. acceptable deviation |
| RTO vs. RPO | Time to restore vs. amount of data loss |
| MOU vs. MOA | Informal intent vs. formal conditions |
| Due diligence vs. due care | Investigate vs. act on it |
| OAuth vs. SAML | Authorization delegation vs. authentication assertions (SSO) |
| Tabletop vs. simulation | Discussion vs. practice drill |
| Hot vs. warm vs. cold site | Ready now vs. partial vs. empty |
| Data types vs. classifications | "Regulated" vs. "Restricted" are on different lists |
| UPS vs. generator | Instant but short (minutes) vs. prolonged but slow to start; they complement each other |
| ISO 27001 vs. 27002 | Certifiable ISMS requirements vs. implementation guidance for the controls |
| GDPR vs. HIPAA breach notice | 72 hours (to the regulator) vs. 60 days (to individuals) |
| Chain of custody vs. preservation | Who handled the evidence vs. keeping it unchanged (hashes, write blockers) |
| Same sign-on vs. single sign-on | Same credentials at every app (LDAP) vs. log in once (SAML) |
| Fail-open vs. fail-closed | Availability vs. security |
| Internal vs. external audit | For the board (audit committee; internal audit is independent of IT) vs. for outside parties (regulators, customers) |
| Audit committee vs. internal audit | Independent board directors who oversee vs. the employee function that does the auditing |
| auth.log vs. syslog | Logins, sudo, SSH (auth/authorization) vs. general system messages that exclude auth by default |
| Risk register vs. risk heat map | The detailed record (description, likelihood, impact, controls, owner, KRIs) vs. a color-coded picture of the ratings |
| RCA (root cause analysis) vs. RCSA (risk and control self-assessment) | Why an incident happened (4.8) vs. business units rating their own risks and controls (feeds the register) |
| Proxy vs. VPN gateway | Relays and inspects application requests (L7 filtering, caching) vs. terminates encrypted remote-access tunnels |
| Serverless vs. microservices | Hosting model where the vendor patches everything below your code vs. an app design that can run anywhere (you often patch OS, images and runtime) |
| Whaling vs. BEC | Defined by the **target** (an executive) vs. defined by the **goal** (wire transfer/invoice fraud, often *impersonating* an executive) |
| IPSec vs. TLS VPN | Encrypts each IP packet at Layer 3 (IKE authenticates) vs. encrypts a session stream above TCP/UDP (browser-friendly, port 443) |
| AH vs. ESP | Integrity + authentication, **no encryption** vs. encryption + integrity |
| Passwordless vs. attestation (4.6) | Verifies the **user** without a password vs. proves the **device/authenticator** is genuine (make, model, hardware/software state) |
| Attestation in 4.6 vs. 5.5 | Device/authenticator proves it's genuine vs. a formal statement that controls are effective |
| Full-disk vs. database-level encryption | Protects a powered-off/stolen drive vs. protects DB files, backups and fields while the server is running |
| Periodic review vs. continual updating (5.1) | Scheduled, approved revision of controlled governance documents vs. constant edits (CompTIA treats this as wrong for policies/guidelines) |
| Rule-based vs. ABAC | Uniform conditions on the request (time, IP) for everyone vs. combined user + resource + environment attributes, fine-grained |
| Compliance vs. self-assessment (5.5 internal) | Checks against laws/regulations/policies, finds noncompliance vs. a team rating its own controls and performance in general |
| Risk appetite postures vs. risk strategies (5.2) | Attitude toward risk (expansionary/conservative/neutral) vs. action on one risk (transfer/accept/avoid/mitigate) |

**Maintenance rule:** when a practice question exposes a new keyword → term mapping, add a row to the relevant objective's table. When it exposes a term filed under an unexpected objective, add it to the Collision Terms table in [objectives_coverage.md](objectives_coverage.md) instead.
