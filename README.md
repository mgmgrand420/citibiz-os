╔══════════════════════════════════════════════╗
║            C I T I B I Z   O S v1.3.2b       ║
║        Mission Control — Boot Sequence       ║
╚══════════════════════════════════════════════╝

CitiBiz OS is a modular, local-first operating environment built on:

• XJSON Runtime — declarative interface + UI renderer  
• ASX Engine — DOM action system for HUD + desktop events  
• JASON-DB — encrypted local data vault (E1 encryption)  
• SRV-B / SRV-C Hybrid — Node server + Desktop (.exe/.app)

This system is designed to run as either a browser-based OS or a full desktop OS with asset-level control, modular apps, and a secure local JSON architecture.

---

### 🚀 FEATURES

✔ Local-First Encrypted Vault (no Firebase, no Supabase, no vendor lock)  
✔ Login Desk UI (wallet, key-file, or unlock-pin flows)  
✔ Desktop HUD and Window Manager (ASX-driven)  
✔ XJSON Page Routing + UI Definitions  
✔ Hybrid Server Support (Browser + Desktop Runtime)  
✔ Installer + Auto-Patch System  
✔ Plugin-Ready for Store, Wallet, or P2P Modules

---

### 🖥️ BOOT OPTIONS

| Mode | Command | Target |
|--------|---------|---------|
| Browser Mode | `./start_os.sh` or `start_os.bat` | http://localhost:4640 |
| Desktop Mode | *(generated in Release Phase)* | Windows / Mac App |

---

### 📌 DIRECTORY MAP

/asx        → HUD + desktop event actions  
/css        → UI + display layers  
/router     → page routing (XJSON)  
/runtime    → engine, dom, renderer, vault  
/server     → Node runtime for SRV-B/SRV-C  
/xjson      → UI + page definitions (login, dashboard, boot)

---

### 📌 ROADMAP

| Version | Upgrade |
|---------|---------|
| v1.3.x  | Desktop build + JSON-Store apps |
| v1.4.x  | Plugin system (Store, Wallet, P2P) |
| v1.5.x  | Multi-User + Remote Sync (optional) |

---

### 📌 LICENSE

MIT License — open to build on, modify, or commercialize.

---

### 📌 AUTHOR

Developed by **Michael (mgmgrand420)**  
Powered by **JSON-OS Architecture**

---

### 📌 STATUS

🟢 Engine online  
🟢 Login Desk online  
🟡 Desktop build in progress (this release cycle)
