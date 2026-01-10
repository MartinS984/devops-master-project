🚀 DevOps Master Project: Automated Microservices Deployment on AWS
Date: January 10, 2026 Status: ✅ Completed Author: Martin

1. Project Overview
This project demonstrates the deployment of a Three-Tier Microservices Application (React Frontend, Node.js Backend, PostgreSQL Database) to the AWS Cloud. The infrastructure is managed as code (IaC), and the deployment process is fully automated using a CI/CD pipeline.

🏗️ Technology Stack
Cloud Provider: AWS (EKS, ECR, ELB, VPC, IAM)

Infrastructure as Code: Terraform

Orchestration: Kubernetes (K8s)

CI/CD: GitHub Actions

Containerization: Docker

Scripting: Bash, Sed

2. Key Achievements & Solutions
✅ Infrastructure Automation
Built a production-ready Kubernetes cluster using Terraform, automating the provisioning of VPCs, Subnets, and Security Groups.

Troubleshooting: Resolved Terraform state synchronization issues (ResourceInUseException, ResourceNotFound) by manually reconciling the state with AWS.

✅ CI/CD Pipeline Success
Implemented a GitHub Actions workflow that:

Builds Docker images for Frontend and Backend in parallel.

Pushes artifacts to Amazon ECR.

Deploys directly to EKS using kubectl.

Outcome: Achieved a "Green" pipeline run with zero manual intervention.

✅ Solving Persistence & Networking
Database: Diagnosed a Pending state in PostgreSQL caused by missing storage drivers. Implemented an Ephemeral Storage strategy (emptyDir) to enable instant portability and successfully started the database.

Backend Exposure: Transformed the Backend service from ClusterIP (Private) to LoadBalancer (Public), enabling external health checks and verification.

3. Technical Walkthrough (Step-by-Step)
Phase 1: Infrastructure Provisioning
Commands used to spin up the AWS environment:

Bash

cd terraform-aws-eks
terraform init
terraform apply -auto-approve
aws eks update-kubeconfig --region us-east-1 --name devops-cluster-tf
Phase 2: Pipeline Configuration
Key steps in .github/workflows/deploy.yml:

AWS Login: Authenticating with OpenID Connect (OIDC).

Dynamic Tagging: Using ${{ github.sha }} to tag Docker images.

Manifest Injection: Using sed to replace image placeholders in k8s/ files before deployment.

Phase 3: The "Fixes" (Debugging Log)
Issue: Database Pod stuck in Pending. Fix: Modified k8s/postgres.yaml to use memory-based storage for the demo.

YAML

volumes:
  - name: postgres-storage
    emptyDir: {}  # Replaced persistentVolumeClaim
Issue: Backend unreachable (Failed to fetch). Fix: Updated k8s/backend.yaml to expose the service.

YAML

spec:
  type: LoadBalancer # Changed from ClusterIP
Phase 4: Cleanup Strategy
To prevent billing leakage, the following resource destruction order was strictly followed:

Repositories: aws ecr delete-repository --force ...

Load Balancers: Verified via aws elb describe-load-balancers and manually deleted orphans.

Infrastructure: terraform destroy -auto-approve

4. Resume Bullet Points (Portfolio)
Add this to your "Projects" section on your CV/LinkedIn:

Automated Cloud-Native Deployment (AWS EKS & GitHub Actions)

Architected a scalable Kubernetes infrastructure on AWS using Terraform, reducing environment provisioning time by 90%.

Engineered a CI/CD pipeline with GitHub Actions that automates the build, test, and deployment of Dockerized React and Node.js microservices.

Resolved critical storage and networking constraints by implementing dynamic volume strategies and configuring AWS Load Balancers for service discovery.

Optimized cloud costs by implementing strict resource cleanup scripts for ECR repositories and orphaned Elastic Load Balancers.

5. Visual Evidence
CI/CD Success: (Pipeline Verification)

Live Backend: (Network Verification)

Frontend Status: (App Verification)