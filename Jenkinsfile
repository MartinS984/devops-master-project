pipeline {
    agent any

    environment {
        // REPLACE THIS WITH YOUR USERNAME!
        DOCKERHUB_USER = "martins984" 
        IMAGE_TAG = "v${BUILD_NUMBER}"
        // Matches the ID you created in Step 2
        DOCKER_CREDS_ID = "docker-hub-credentials"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    // This securely injects the username/password
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDS_ID}", passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    }
                }
            }
        }

        stage('Build & Push Backend') {
            steps {
                script {
                    echo "Building Backend..."
                    // Build with the Docker Hub tag
                    sh "docker build -t ${DOCKERHUB_USER}/backend:${IMAGE_TAG} ./backend"
                    sh "docker build -t ${DOCKERHUB_USER}/backend:latest ./backend" // Also tag 'latest'
                    
                    echo "Pushing Backend..."
                    sh "docker push ${DOCKERHUB_USER}/backend:${IMAGE_TAG}"
                    sh "docker push ${DOCKERHUB_USER}/backend:latest"
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                script {
                    echo "Building Frontend..."
                    sh "docker build -t ${DOCKERHUB_USER}/frontend:${IMAGE_TAG} ./frontend"
                    sh "docker build -t ${DOCKERHUB_USER}/frontend:latest ./frontend"
                    
                    echo "Pushing Frontend..."
                    sh "docker push ${DOCKERHUB_USER}/frontend:${IMAGE_TAG}"
                    sh "docker push ${DOCKERHUB_USER}/frontend:latest"
                }
            }
        }
    }

    post {
        always {
            echo "Cleaning up local images..."
            // Remove the images from local disk to save space (they are safe in the cloud now)
            sh "docker rmi ${DOCKERHUB_USER}/backend:${IMAGE_TAG} || true"
            sh "docker rmi ${DOCKERHUB_USER}/frontend:${IMAGE_TAG} || true"
        }
    }
}