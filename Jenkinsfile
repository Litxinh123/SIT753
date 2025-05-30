pipeline {
    agent any

    environment {
        NODE_HOME = '/Users/anhtuan097856/.nvm/versions/node/v23.9.0/bin'
        NVM_DIR = '/Users/anhtuan097856/.nvm'
        PATH = "/usr/local/bin:/Users/anhtuan097856/.nvm/versions/node/v23.9.0/bin:${env.PATH}"
        SNYK_TOKEN = credentials('snyk-token')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo 'Running unit tests...'
                sh 'npm test'
            }
        }

        stage('Code Quality Check') {
            steps {
                echo 'Running ESLint for code quality...'
                sh 'npm run lint || echo "Lint errors detected but continuing..."'
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running Snyk security scan...'
                sh 'snyk auth $SNYK_TOKEN'
                sh 'snyk test || echo "Vulnerabilities found but continuing..."'
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment using docker-compose.staging.yml...'
                sh 'docker compose -f docker-compose.staging.yml down || true'
                sh 'docker compose -f docker-compose.staging.yml up -d --build --remove-orphans'
            }
        }

        stage('Approval for Production') {
            steps {
                input message: 'Do you want to deploy to production?', ok: 'Yes, deploy'
            }
        }

        stage('Release to Production') {
            steps {
                echo 'Deploying to production environment using docker-compose.production.yml...'
                sh 'docker compose -f docker-compose.production.yml down || true'
                sh 'docker compose -f docker-compose.production.yml up -d --build --remove-orphans'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Checking health of the deployed application...'
                sh '''
                    echo "Waiting for the app to start..."
                    sleep 20
                    curl -f http://localhost:3001 || echo " Application is down or unhealthy"
                '''
            }
        }
    }

    post {
        success {
            echo 'All stages completed successfully.'
        }
        failure {
            echo 'Pipeline failed at some stage.'
        }
    }
}
