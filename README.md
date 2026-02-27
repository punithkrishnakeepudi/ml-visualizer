# 🧠 ML Visualizer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

**An open-source, real-time Machine Learning visualization platform designed for teaching and intuitive dataset understanding.**

![ML Visualizer Hero](docs/screenshots/hero.png)

## ✨ Features

- 🚀 **Real-time Visualization**: Watch ML models learn and adapt in real-time.
- 📊 **Dataset Analysis**: Drag and drop your datasets for instant statistical insights and visual distribution mapping.
- 🧩 **Interactive Neurons**: Explore neural network layers, weights, and activations interactively.
- 🧪 **Loss/Accuracy Curves**: Live tracking of model performance metrics.
- 🌓 **Premium UI**: Sleek, glassmorphic dark mode interface optimized for focus and clarity.
- 🐳 **Dockerized**: One-command deployment using Docker & Docker Compose.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Heroicons |
| **Backend** | FastAPI, Python, NumPy, Pandas, Scikit-Learn |
| **Styling** | Vanilla CSS + Tailwind |
| **DevOps** | Docker, Docker Compose |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Docker (optional)

### Quick Run (Docker)

```bash
docker-compose up --build
```

### Local Development Setup

#### 1. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

#### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📂 Project Structure

```text
.
├── backend/          # FastAPI application
│   ├── algorithms/   # ML algorithm implementations
│   ├── routes/       # API endpoints
│   └── services/     # Core business logic
├── frontend/         # React + Vite application
│   ├── src/          # Source code
│   └── public/       # Static assets
├── docs/             # Documentation & screenshots
└── docker-compose.yml
```

---

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">
  Developed with ❤️ by <a href="https://github.com/punithkrishnakeepudi">Punith Krishna</a>
</p>
