# Start with the official Jenkins LTS image
FROM jenkins/jenkins:lts-jdk17

# Switch to root to install software
USER root

# Install the standard Docker CLI
RUN apt-get update && \
    apt-get install -y docker.io && \
    rm -rf /var/lib/apt/lists/*

# Switch back to the Jenkins user
USER jenkins