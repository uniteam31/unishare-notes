pipeline {
    agent any

    environment {
        NODEJS_HOME = "${tool 'node21'}"
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"

        REPO_URL = "https://github.com/uniteam31/unishare-notes.git"
        BRANCH_NAME = "${env.BRANCH_NAME ?: 'dev'}"
        DOCKER_IMAGE_NAME = "def1s/unishare-notes"
        DOCKER_REGISTRY = "https://registry.hub.docker.com"
        DOCKER_CREDENTIALS_ID = "docker-def1s"
        DEV_SERVER_IP = "176.114.90.241"
        DEPLOY_SCRIPT_PATH = "/root/unishare-orchestration/deploy.sh"
        API_URL = "http://176.114.90.241/api"
        NPMRC_CONFIG_FILE_ID = "uniteam-npmrc"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: BRANCH_NAME, url: REPO_URL
            }
        }

        stage('Run Tests and Linters') {
            steps {
                echo "Current branch: ${BRANCH_NAME}"

                // TODO добавить сборку и тесты
                // sh 'yarn install && yarn lint && yarn test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def branchName = env.CHANGE_BRANCH ?: BRANCH_NAME
                    echo "Building branch: ${branchName}"

                    // Загружаем конфигурационный файл .npmrc
                    configFileProvider([configFile(fileId: NPMRC_CONFIG_FILE_ID, variable: 'NPMRC_PATH')]) {
                        sh "cp ${NPMRC_PATH} .npmrc"
                        app = docker.build(
                            DOCKER_IMAGE_NAME,
                            "--no-cache --build-arg BRANCH=${branchName} --build-arg API_URL=${API_URL} ."
                        )
                        sh "rm -f .npmrc" // Удаляем временный .npmrc после сборки
                    }
                }
            }
        }

        stage('Push Docker Image') {
            when {
                branch 'dev'
            }
            steps {
                script {
                    docker.withRegistry(DOCKER_REGISTRY, DOCKER_CREDENTIALS_ID) {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }

        stage('Deploy to Dev Server') {
            when {
                branch 'dev'
            }
            steps {
                sshagent(['jenkins-test_ssh']) {
                     sh "ssh root@${DEV_SERVER_IP} \"${DEPLOY_SCRIPT_PATH}\""
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline выполнен успешно.'
        }
        failure {
            echo 'Pipeline завершился с ошибкой.'
        }
        always {
            script {
                if (app) {
                    echo "Cleaning up Docker image ${DOCKER_IMAGE_NAME}"
                    sh "docker rmi ${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} || true"
                    sh "docker rmi ${DOCKER_IMAGE_NAME}:latest || true"
                }
            }

            cleanWs()
        }
    }
}