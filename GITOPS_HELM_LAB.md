# ⚓ Local GitOps Lab: ArgoCD & Helm

**Date:** January 12, 2026
**Status:** ✅ Completed
**Tech Stack:** Minikube, Docker, Kubernetes, Helm, ArgoCD

---

## 1. Project Goal
To transition from a "Push-based" deployment (manually running `kubectl apply`) to a **"Pull-based" GitOps workflow**. We replaced static Kubernetes manifests with dynamic **Helm Charts**, allowing ArgoCD to automatically sync changes from GitHub to the local cluster.

### 🔑 Key Concepts Learned
* **Helm:** The "Package Manager" for Kubernetes. Turns static YAML into dynamic templates.
* **GitOps:** The cluster state is defined in Git. If Git changes, the cluster updates automatically.
* **Local Loop:** Building Docker images directly inside Minikube to avoid pushing to remote registries during development.

---

## 2. Implementation Steps

### Phase 1: The "Helmification" (Templating)
Instead of hardcoding image tags and ports, we created a reusable Chart.

1.  **Initialize Chart:**
    ```bash
    mkdir helm-charts
    cd helm-charts
    helm create devops-app
    # Cleaned up default templates to start fresh
    ```

2.  **Templating Manifests:**
    We moved standard YAMLs into `templates/` and replaced hardcoded values with variables:
    ```yaml
    # Before (Static)
    image: my-repo/backend:v1

    # After (Dynamic)
    image: "{{ .Values.backend.image }}:{{ .Values.backend.tag }}"
    ```

3.  **Defining Values (`values.yaml`):**
    Centralized configuration file to control the entire stack.
    ```yaml
    backend:
      image: "backend"
      tag: "v1"
      replicas: 1
    ```

### Phase 2: Local Build Strategy
Since we aren't pushing to Docker Hub/ECR, we pointed our terminal to Minikube's internal Docker daemon.

1.  **Switch Context:**
    ```bash
    eval $(minikube docker-env) # Linux/WSL
    # or
    minikube -p minikube docker-env --shell powershell | Invoke-Expression # Windows
    ```
2.  **Build Images:**
    ```bash
    docker build -t backend:v1 ./backend
    docker build -t frontend:v1 ./frontend
    ```
3.  **Update Helm:** Configured `imagePullPolicy: IfNotPresent` so Kubernetes uses the local images.

### Phase 3: The GitOps Controller (ArgoCD)
1.  **Installation:**
    ```bash
    kubectl create namespace argocd
    kubectl apply -n argocd -f [https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml](https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml)
    ```
2.  **Access:**
    * **Port Forward:** `kubectl port-forward svc/argocd-server -n argocd 8080:443`
    * **URL:** `https://localhost:8080`
    * **Password Retrieval:** `kubectl -n argocd get secret argocd-initial-admin-secret ...`

### Phase 4: Deployment & Networking
1.  **App Creation:** Connected ArgoCD to the GitHub repository (Path: `helm-charts/devops-app`).
2.  **Sync:** ArgoCD detected the Helm chart and automatically deployed the stack.
3.  **Networking Fix:** Since Minikube cannot issue real LoadBalancer IPs, we opened a tunnel:
    ```bash
    minikube tunnel
    ```
    * **Result:** Services turned Green 💚 and obtained External IPs.

---

## 3. Comparison: Old Way vs. New Way

| Feature | Previous Project (K8s Manifests) | This Project (GitOps + Helm) |
| :--- | :--- | :--- |
| **Updates** | Manual `kubectl apply -f ...` | Automatic (Git Push triggers Sync) |
| **Config** | Hardcoded in every file | Centralized in `values.yaml` |
| **Versioning** | Difficult to track | Version controlled in `Chart.yaml` |
| **Rollback** | Manual `kubectl undo` | One-click Rollback in ArgoCD UI |

---

## 4. Commands Reference

**Validate Chart Syntax:**
```bash
helm template .

---

## 5. Verification: Seeing GitOps in Action

To verify the "Pull-based" workflow is active, perform this simple test:

1.  **Modify Code:** Open `helm-charts/devops-app/values.yaml` and change `replicas: 1` to `replicas: 3`.
2.  **Push to Git:**
    ```bash
    git add .
    git commit -m "Scale up backend to 3 replicas"
    git push origin feature/gitops-helm
    ```
3.  **Observe:** Go to the ArgoCD dashboard. Within 60 seconds (or after clicking "Refresh"), you will see new pods spinning up automatically.

**Result:** The cluster state synced with Git without running a single `kubectl` command. 🚀