# Control Types

**Relevant Domains:** 1.1 (Compare and contrast various types of security controls), 3.2 (Security Architecture)

---

## The Two Classification Systems

Every security control has both a **category** (what it's made of) and a **function** (what job it does). The exam tests both, often in the same question.

---

## Classification 1: Control Categories

### Technical (Logical)
Implemented through technology — hardware, software, or firmware.
- Firewalls, encryption, antivirus, access control lists, MFA, IDS/IPS

### Managerial (Administrative)
Implemented through policy, process, and governance — people and paper.
- Security policies, risk assessments, background checks, security awareness training requirements

### Operational
Day-to-day procedures carried out by people.
- Incident response procedures, change management processes, guard patrols, delivering training

### Physical
Controls you can touch — protecting the physical environment.
- Locks, badge readers, security cameras, fences, mantraps, guards

> **Managerial vs. Operational:** Managerial = the *planning and design* layer (policies, audits, decisions). Operational = the *execution* layer (procedures being carried out). Watch for words like "policy" or "requires" (Managerial) vs. "conducts" or "performs" (Operational).

---

## Classification 2: Control Functions

### Preventive
Stops an incident **before** it happens.
- Firewall, locked door, security policy, access control list

### Detective
Identifies and alerts on incidents **during or after** they occur. Does not stop them.
- IDS, audit logs, security cameras (monitoring), motion sensors

### Corrective
Minimizes damage and **restores** systems after an incident.
- Backups, patch management, incident response plan, system reimaging

### Deterrent
**Discourages** attackers without directly preventing access. Psychological in nature.
- Warning banners, visible security cameras, visible guards, warning signs

### Compensating
A **substitute** control used when the primary control cannot be implemented.
- Legacy system can't be patched → network segmentation isolates it instead

### Directive
**Instructs** people how to behave. The weakest functional type on its own — relies on voluntary compliance.
- Acceptable use policies, security awareness training, "no tailgating" signs

---

## How the Two Systems Overlap

| Control | Category | Function |
|---------|----------|---------|
| Firewall | Technical | Preventive |
| Security camera (visible) | Physical | Deterrent |
| Security camera (monitored) | Physical | Detective |
| Audit log | Technical | Detective |
| Background check requirement | Managerial | Preventive |
| Background check being conducted | Operational | Preventive |
| Network segmentation (for legacy system) | Technical | Compensating |
| Security awareness training (policy) | Managerial | Directive |
| Security awareness training (delivery) | Operational | Directive |
| Warning login banner | Technical | Deterrent |
| Incident response plan | Managerial | Corrective |
| Backup system | Technical/Operational | Corrective |

---

## IDS vs. IPS

### Core Distinction

| | IDS | IPS |
|---|---|---|
| Full name | Intrusion Detection System | Intrusion Prevention System |
| Position | **Out of band** — monitors a copy of traffic | **Inline** — sits directly in the traffic path |
| What it does | Detects and **alerts** | Detects and **blocks** |
| Control function | **Detective** | **Preventive** |
| Risk if it fails | Missed alerts | Traffic disruption (availability risk) |

### Placement

```
IDS — Out of Band
Internet → Firewall → Switch ──→ Internal Network
                         │
                         └──→ IDS (copy via port mirror — can alert, cannot block)

IPS — Inline
Internet → Firewall → IPS → Switch → Internal Network
                      ↑
               (all traffic flows through — can block)
```

### Detection Methods

| Method | How it works | Strength | Weakness |
|--------|-------------|----------|---------|
| Signature-based | Matches known attack patterns | Accurate, low false positives | Cannot detect zero-days |
| Anomaly-based | Flags deviations from baseline | Can detect unknown attacks | Higher false positive rate |
| Heuristic/Rule-based | General suspicious behavior rules | More flexible than signatures | Less precise than signatures |

### NIDS vs. HIDS

| | NIDS/NIPS | HIDS |
|---|---|---|
| Runs on | Network appliance | Individual endpoint |
| Sees | Network packets | Local files, logs, processes, registry |
| Best for | Network-level attacks | Malware, file tampering, local intrusions |

### False Positives vs. False Negatives

| | What it means | Associated detection method |
|---|---|---|
| **False Positive** | Legitimate traffic flagged as malicious | Anomaly-based (too sensitive) |
| **False Negative** | Malicious traffic missed entirely | Signature-based (no signature for new attacks) |

---

## Common Exam Traps

- **IDS ≠ IPS** — IDS detects, IPS blocks. An IDS cannot stop traffic even if it sees it.
- **Detective ≠ Preventive** — Detecting something after the fact is not the same as stopping it.
- **Deterrent ≠ Preventive** — Discouraging is not the same as blocking.
- **Compensating requires a reason** — It's only compensating if it substitutes for a control that *cannot* be implemented.
- **Directive is the weakest** — Always backed up by stronger controls in practice.
- **False positive ≠ false negative** — Miss the distinction under pressure and you'll lose points.

---

## Practice Questions

1. A company's security team receives an alert that suspicious traffic was detected on the network. Upon investigation, they discover the traffic had already reached its destination by the time the alert fired. What type of system generated this alert, and what does its placement in the network tell you about why it couldn't stop the traffic?

2. A security administrator notices the intrusion detection system is generating hundreds of alerts per day for traffic that, after manual review, turns out to be legitimate business activity. What is this phenomenon called, and which detection method is most likely responsible for it?

3. A hospital cannot upgrade a legacy medical device because the manufacturer no longer supports software updates. The security team places the device on an isolated network segment with strict firewall rules controlling what it can communicate with. What control function does the network segmentation represent, and what category does it fall under?

4. A company publishes a formal document requiring that all employees must complete security awareness training annually. The CISO signs off on it and it is stored in the policy management system. A separate team then schedules, delivers, and tracks completion of that training every year. What control category applies to the document, and what control category applies to the delivery of the training? What control function does the training itself represent?

5. A security engineer deploys a system inline between the firewall and the internal network. The system is configured to automatically drop packets that match known attack signatures, but the security team is concerned that if the system becomes overwhelmed, it could disrupt access to critical business systems. Identify the control type and function. Then explain why the concern about disruption is unique to this deployment model, and what term describes the failure mode where malicious traffic is missed entirely.
