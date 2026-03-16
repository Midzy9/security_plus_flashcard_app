# Zero Trust Architecture

**Relevant Domains:** 1.2 (Fundamental Security Concepts), 3.1 (Architecture Models), 4.6 (Identity and Access Management)

---

## The Core Idea

Traditional security assumed that everything **inside** the network could be trusted and everything **outside** could not. This "castle and moat" model breaks down in the modern world of cloud, remote work, and insider threats.

Zero Trust flips this on its head:

> **"Never trust, always verify."**

No user, device, or system is trusted by default — **regardless of network location**. Even if you're already inside the corporate network, you still have to prove who you are and what you're allowed to do every time.

---

## The Three Core Principles

| Principle | What it means |
|-----------|--------------|
| **Verify Explicitly** | Always authenticate and authorize based on all available data — identity, location, device health, service, workload, data classification |
| **Use Least Privilege** | Limit access to only what's needed, when it's needed (just-in-time / just-enough-access) |
| **Assume Breach** | Design as if attackers are already inside — minimize blast radius, segment access, encrypt everything, monitor continuously |

---

## The Two Planes

Zero Trust separates how access decisions are **made** from how they are **enforced**:

```
┌─────────────────────────────────────┐
│         CONTROL PLANE               │
│  Policy Engine + Policy Administrator│
│  (decides: should this be allowed?) │
└──────────────┬──────────────────────┘
               │ signal
┌──────────────▼──────────────────────┐
│          DATA PLANE                 │
│    Policy Enforcement Point (PEP)   │
│  (acts: allow, block, or challenge) │
└─────────────────────────────────────┘
```

---

## The Three Core Components

### 1. Policy Engine (PE)
The **brain / judge**. Evaluates all available signals against policy and outputs a verdict:
- **Grant** — allow access
- **Deny** — block access
- **Revoke** — terminate an existing session

Does not talk to users directly and does not block traffic itself.

> **Exam cue:** If a question describes something *evaluating signals and making a trust decision*, that's the Policy Engine.

### 2. Policy Administrator (PA)
The **messenger / bailiff**. Receives the verdict from the Policy Engine and communicates it to the enforcement point.
- PE says grant → PA tells PEP to open the session
- PE says deny → PA tells PEP to block
- PE says revoke → PA tears down an active connection

> **Exam cue:** If a question describes something *communicating or signaling an access decision* to an enforcement mechanism, that's the Policy Administrator.

> **Note:** The PE and PA are sometimes combined into a single logical unit called the **Policy Decision Point (PDP)**.

### 3. Policy Enforcement Point (PEP)
The **gatekeeper / bouncer**. Sits directly in the path between the subject and the resource. Does not make decisions — only acts on them. Can be a next-gen firewall, proxy, API gateway, identity-aware proxy, etc.

Also reports session activity back to the PA for continuous evaluation — meaning access can be revoked mid-session if behavior changes.

> **Exam cue:** If something is described as sitting **in front of** or **between** a user and a resource, it's almost always the **PEP**.

### Component Flow

```
User/Device
    │
    ▼
┌─────────────────────┐
│  Policy Enforcement │  ← Acts on decisions (allows/blocks)
│     Point (PEP)     │
└──────────┬──────────┘
           │ reports session info
           ▼
┌─────────────────────┐
│  Policy Administrator│  ← Communicates decisions
│       (PA)          │
└──────────┬──────────┘
           │ verdict
           ▼
┌─────────────────────┐
│   Policy Engine     │  ← Makes trust decisions
│       (PE)          │
└─────────────────────┘
           ▲
           │ signals (identity, device health,
           │ location, behavior, threat intel...)
```

### Memory Trick

| Component | Role | Think of it as... |
|-----------|------|-------------------|
| Policy Engine | Decides | The judge |
| Policy Administrator | Communicates | The bailiff |
| Policy Enforcement Point | Acts | The door |

---

## What Zero Trust Evaluates (Signals)

Before granting access, Zero Trust considers:
- **Who** is the user? (Identity — MFA, certificates)
- **What** device are they on? (Device health, compliance, MDM enrollment)
- **Where** are they? (Location, IP, unusual geography)
- **When** are they asking? (Time of day anomalies)
- **What** are they trying to access? (Resource sensitivity)
- **How** are they behaving? (UEBA — behavior analytics)

---

## Zero Trust vs. Traditional Perimeter Security

| | Traditional | Zero Trust |
|---|---|---|
| Trust model | Trust inside, distrust outside | Trust nobody by default |
| Perimeter | Hard outer edge (firewall) | Identity IS the perimeter |
| Lateral movement | Easy once inside | Contained — each hop requires re-verification |
| Remote users | VPN into the trusted zone | Direct access, continuously verified |

---

## Cross-Domain Connections

Zero Trust ties into concepts across all 5 domains:

| Concept | Domain |
|---------|--------|
| MFA & strong authentication | 4.6 |
| Least privilege | 1.2 |
| Network segmentation | 2.5 |
| EDR & UEBA (continuous monitoring signals) | 2.5, 4.4 |
| PAM (privileged account enforcement) | 4.6 |
| SIEM/SOAR (behavioral signals to policy engine) | 4.4 |

---

## Exam Tips

- **"Verify Explicitly"** → per-request evaluation, checking signals on every access
- **"Assume Breach"** → segmentation, minimizing blast radius, planning for the worst
- **"Least Privilege"** → minimum necessary access, just-in-time, just-enough-access
- Proxies, firewalls, and API gateways acting on instructions = **PEP**, not PA
- PE + PA combined = **Policy Decision Point (PDP)**
- An organization can be **compliant but still not Zero Trust** — compliance is a floor, not a model

---

## Practice Questions

1. A security architect is designing a new system where no user is automatically trusted after logging in — even from a known device on the corporate network. Every access request to every resource is evaluated against identity, device health, and behavior before being granted. What security model is being implemented, and what core principle is most directly reflected by the continuous per-request evaluation?

2. A Zero Trust component receives signals including the user's identity, their device compliance status, their geographic location, and their recent behavior. Based on these inputs, it produces a verdict of "grant" or "deny." Which Zero Trust component is this, and what is the term used when the Policy Engine and Policy Administrator are combined into a single unit?

3. A user is actively connected to a corporate application. Midway through the session, the system detects that the user's device has fallen out of compliance — its antivirus definitions are outdated. The active session is immediately terminated. Which two Zero Trust components worked together to make this happen, and what does this scenario demonstrate about Zero Trust that traditional perimeter security does not provide?

4. A company deploys an identity-aware proxy in front of all internal applications. No user can reach any application without passing through it, and it allows or blocks connections based on instructions it receives from a centralized access decision system. What Zero Trust component is the identity-aware proxy acting as? What component is the "centralized access decision system"?

5. A new employee joins the company and is granted access to only the specific file shares and applications required for their role. They are not given access to anything else, even though others in the building have broader access. Which Zero Trust principle does this reflect, and which related security concept from Domain 1 does it most directly tie back to?
