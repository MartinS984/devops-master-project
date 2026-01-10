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

## 🚀 Phase 6: CI/CD Pipeline Automation

I implemented a fully automated **Continuous Deployment** pipeline using GitHub Actions. This removes manual errors and ensures that every code change is automatically tested and deployed to the AWS Cloud.

### ⚙️ How it Works
1.  **Trigger:** Developers push code to the `main` branch.
2.  **Build Phase:** GitHub Actions spins up a runner to:
    * Build Docker images for both Node.js (Backend) and React (Frontend).
    * Tag images with the unique Git Commit SHA (e.g., `v-a1b2c3d`).
3.  **Push Phase:** Images are securely uploaded to **Amazon ECR** (Elastic Container Registry).
4.  **Deploy Phase:**
    * The pipeline authenticates with the **AWS EKS Cluster**.
    * It dynamically updates the Kubernetes manifests to use the new image tags.
    * `kubectl apply` updates the live application with zero downtime.

### 🛠️ Technologies Used
* **GitHub Actions:** For workflow orchestration.
* **Amazon ECR:** For private container storage.
* **Docker:** For containerizing the microservices.
* **Sed / Bash Scripting:** For dynamic manifest updates.

📌 Project Title: Cloud-Native DevOps Infrastructure (AWS & Kubernetes)
Description: Architected and deployed a highly available three-tier web application (React, Node.js, PostgreSQL) on AWS Elastic Kubernetes Service (EKS).

Key Achievements (Pick 3-4):

Infrastructure as Code (IaC): Provisioned a production-ready AWS EKS cluster, VPC, and Security Groups using Terraform, reducing environment setup time from hours to minutes.

CI/CD Automation: Engineered a robust GitHub Actions pipeline that builds Docker images for Frontend and Backend services in parallel, pushes them to Amazon ECR, and deploys to Kubernetes automatically.

Dynamic Deployment Strategy: Implemented dynamic image tagging using Git Commit SHAs and sed stream editing to ensure precise version control and zero-downtime updates.

Container Orchestration: Managed Kubernetes manifests for Deployments, Services (LoadBalancers), and Storage, successfully troubleshooting complex networking and persistent volume constraints.

Full-Stack Integration: Orchestrated the communication between a React Frontend, Node.js API, and PostgreSQL database within a distributed microservices architecture.

🏷️ Skills & Keywords (For ATS Scanners)
Cloud: AWS (EKS, ECR, IAM, VPC, ELB)

DevOps Tools: Terraform, Docker, GitHub Actions, Kubernetes (kubectl)

General: CI/CD, Microservices, Infrastructure as Code, Troubleshooting, Linux/Bash
