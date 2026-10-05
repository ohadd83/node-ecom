pipeline {

    agent any

    environment {
        DOCKER_IMAGE = "ohadd83/ecommerce-nodejs"
        DOCKER_TAG   = "${BUILD_NUMBER}"
        CONTAINER_NAME = "ecommerce-app"
        APP_PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm ci
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    npm test
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                        -t ${DOCKER_IMAGE}:${DOCKER_TAG} \
                        -t ${DOCKER_IMAGE}:latest \
                        .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                            -u "$DOCKER_USERNAME" \
                            --password-stdin

                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker push ${DOCKER_IMAGE}:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}

                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${APP_PORT}:3000 \
                        ${DOCKER_IMAGE}:${DOCKER_TAG}
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 5

                    curl -f http://localhost:${APP_PORT}/health
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
            echo "Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
        }

        failure {
            echo "Pipeline failed!"
        }
    }
}
