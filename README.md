# 🧠 Gratech Super Brain
### The Unified AI Intelligence Gateway

![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## 🚀 Overview
**Gratech Super Brain** is a next-generation AI dashboard that orchestrates the world's most powerful language models into a single, cohesive interface. Instead of relying on a single AI provider, this system leverages a "Council of Minds" approach:

*   **DeepSeek-V3:** For deep reasoning and code generation.
*   **Llama-3.1-405B:** For broad knowledge and open-source intelligence.
*   **GPT-5 (Preview):** For state-of-the-art conversational context and nuance.

This project demonstrates a production-ready architecture using **Azure Web Apps**, **Docker Containers**, and a **FastAPI** backend, fully secured and scalable.

## ✨ Key Features
*   **Unified API Gateway:** A single endpoint to query multiple AI giants.
*   **Real-Time Intelligence:** Low-latency responses optimized via Azure Cloud.
*   **Secure Architecture:** Enterprise-grade security with Azure Key Vault & App Settings (No hardcoded secrets).
*   **Modern UI:** A sleek, responsive React frontend for seamless interaction.

## 🛠️ Tech Stack
*   **Frontend:** React, TypeScript, Vite, TailwindCSS.
*   **Backend:** Python 3.11, FastAPI, OpenAI SDK (Azure Adapter).
*   **Infrastructure:** Azure Web App for Containers, Azure Container Registry (ACR).
*   **DevOps:** Docker, Git.

## 🌐 Live Platform
> **Note:** The GraTech AI Platform is now hosted on a dedicated server at `172.201.26.111`. The domain `gratech.sa` points directly to this server and is no longer served via GitHub Pages.

Access the live GraTech AI Platform here:
[**Launch GraTech AI Platform**](https://gratech.sa)

## 📦 Installation & Setup

### Prerequisites
*   Docker
*   Azure CLI
*   Node.js 18+

### Local Development
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Grar00t/gratech-ai-dashboard.git
    ```
2.  **Backend Setup:**
    ```bash
    cd backend
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```
3.  **Frontend Setup:**
    ```bash
    npm install
    npm run dev
    ```

## 🤝 Contributing
Open source is at the heart of innovation. Feel free to fork this repository, submit Pull Requests, or suggest new features.

---
*Built with ❤️ by Gratech*
