# 🧮 CalcPro Fullstack

CalcPro is a feature-rich, multi-mode calculator application engineered to handle complex operations across multiple computational environments. This project bridges a robust Python backend with a high-performance JavaScript frontend, highlighting clean API architecture, secure data persistence, and seamless asynchronous state synchronization.

**[🚀 View the Live Application Here]([https://calcpro-calculator.onrender.com/)**calcpro-calculator.onrender.com

**[🚀 View the Live Application Here](https://calcpro-calculator.onrender.com/)**


## 🚀 Core Features

- **Multi-Mode Engine:** Switch seamlessly between specialized user interfaces:
  - **Scientific:** Advanced algebraic and trigonometric calculations handled safely via `mathjs`.
  - **Programmer:** Bitwise operations, binary/hex/octal representations, and logic gating.
  - **Financial:** Multi-variable interest, cash-flow formatting, and investment estimation.
  - **Converter:** Fast data translations across metric, imperial, and digital units.
- **Persistent Audit Trail:** Real-time logging of execution history synced instantly to a relational database.
- **RESTful Architecture:** Decoupled backend-to-frontend communication built on top of standardized JSON payloads.
- **Production-Ready Operations:** Ready for cloud-tier hosting with custom production middleware, static-asset pipelining, and automated dependency manifests.

---

## 🛠️ Tech Stack

### Backend Architecture

- **Framework:** Django 5.2 & Django REST Framework (DRF)
- **Production Web Server:** Gunicorn
- **Static Asset Management:** WhiteNoise
- **Database:** SQLite (Development) / Easily portable to PostgreSQL via database engine abstraction

### Frontend Architecture

- **Framework & Tooling:** React 18+ powered by Vite (for near-instant UI bundling)
- **Styling UI:** Responsive CSS & Lucide Icons
- **Mathematical Evaluation:** Safe mathematical expressions handling using `mathjs`

---

## 📂 Project Structure

```text
calculator/
│
├── c_project/               # Django Backend Services
│   ├── c_project/           # Core Project Configuration (Settings, URLs, WSGI)
│   ├── core/                # Core App Layer (Models, Views, Serializers, App URLs)
│   ├── requirements.txt     # Python Dependencies Manifest
│   └── manage.py            # Django Management CLI
│
└── frontend/                # React Vite Frontend Application
    ├── src/                 # Source Application Layer (Components, Assets, App.jsx)
    ├── package.json         # JavaScript Node Dependencies
    └── vite.config.js       # Vite Compilation Engine Settings
```
