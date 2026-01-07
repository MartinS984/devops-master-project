# 🚀 Full SDLC DevOps Project: From Code to Kubernetes

This repository documents the journey of building, containerizing, automating, and monitoring a 3-tier application. The project mimics a real-world DevOps transformation.

## 🏗️ Architecture
* **Frontend:** React.js
* **Backend:** Node.js (Express)
* **Database:** PostgreSQL
* **Orchestration:** Kubernetes (Minikube)
* **CI/CD:** Jenkins
* **Monitoring:** Prometheus & Grafana

## 🗺️ Project Roadmap
### ✅ Phase 1: The Foundation (Local Dev)
- [x] Set up project structure
- [x] Create Node.js Backend API
- [x] Create React Frontend
- [x] Containerize with Dockerfiles
- [x] Orchestrate locally with docker-compose.yml

### ⏳ Phase 2: The Orchestration (Kubernetes)
- [x] Set up Minikube cluster
- [x] Create K8s Deployments & Services
- [x] Expose application using Ingress

### ⏳ Phase 3: The Automation (CI Pipeline)
- [x] Set up Jenkins
- [x] Automate Docker Image Build & Push

### ⏳ Phase 4: The Deployment (CD Pipeline)
*Goal: Automate the deployment to the Kubernetes cluster.*
- [x] Install ArgoCD
- [x] Configure ArgoCD to watch the GitHub Repo
- [x] Enable Auto-Sync and Self-Healing

### ✅ Phase 5: The Observability (Monitoring)
*Goal: Implement monitoring with Prometheus and Grafana.*
- [x] Install Helm
- [x] Deploy kube-prometheus-stack (Prometheus, Grafana, Alertmanager)
- [x] Access Grafana Dashboards
- [x] Visualize Cluster Metrics (CPU, Memory, Network)
