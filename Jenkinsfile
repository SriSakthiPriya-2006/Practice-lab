pipeline {
    agent any

    environment {
        DB_SERVER = 'localhost'
        DB_USER = 'sa'
        DB_PASS = 'YourPassword123'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Fetching source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                bat 'npm install' // use `sh` on Linux
            }
        }

        stage('Setup Database') {
            steps {
                echo 'Running SQL setup script...'
                // For Windows SQL Server CLI:
                bat """
                sqlcmd -S %DB_SERVER% -U %DB_USER% -P %DB_PASS% -i database\\eventdb_setup.sql
                """
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Checking frontend files...'
                bat 'dir frontend'
            }
        }

        stage('Run Backend Server') {
            steps {
                echo 'Starting Node.js backend...'
                bat 'npm start'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully! Server running on port 3000.'
        }
        failure {
            echo '❌ Pipeline failed. Check logs for errors.'
        }
    }
}
