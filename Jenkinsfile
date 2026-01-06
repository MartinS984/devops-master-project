pipeline {
    agent any

    environment {
        // We define the tag here (e.g., using the Build Number)
        IMAGE_TAG = "v${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                // This automatically pulls from the Git repo defined in the job
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    echo "Building Backend Image..."
                    sh "docker build -t my-backend:${IMAGE_TAG} ./backend"
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    echo "Building Frontend Image..."
                    sh "docker build -t my-frontend:${IMAGE_TAG} ./frontend"
                }
            }
        }

        stage('Test') {
            steps {
                echo "Running Tests... (Placeholder)"
                // Here we would run 'npm test', skipping for now
            }
        }
    }

    post {
        always {
            echo "Pipeline finished. Cleaning up..."
            // Optional: Remove images to save space
            // sh "docker rmi my-backend:${IMAGE_TAG} my-frontend:${IMAGE_TAG}"
        }
    }
}