// Jenkinsfile
pipeline {
    agent any // Jalankan di agent/node manapun

    tools {
        nodejs 'NodeJS' // Gunakan tool NodeJS yang sudah dikonfigurasi di Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Ambil kode dari repository Git
                git branch: 'main', url: 'https://github.com/vinanathanias/final-project-course-qa.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Jalankan npm install
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Jalankan tes Cypress
                // Gunakan blok try-catch agar post-build actions tetap berjalan
                script {
                    try {
                        sh 'npx cypress run --spec "cypress/e2e/features/*.feature"'
                    } catch (e) {
                        echo "Tes Cypress gagal, tapi kita akan lanjutkan untuk mempublikasikan laporan."
                        // Menandai build sebagai UNSTABLE jika tes gagal
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
    }

    post {
        always {
            // Blok ini akan selalu dieksekusi, baik build berhasil maupun gagal
            echo 'Mengarsipkan artifak dan mempublikasikan laporan...'

            // 1. Publikasikan laporan HTML
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/reports/html',
                reportFiles: 'index.html',
                reportName: 'Laporan Test Cypress Pipeline'
            ])

            // 2. Arsipkan screenshot dan video sebagai bukti
            archiveArtifacts artifacts: 'cypress/screenshots/**, cypress/videos/**', allowEmptyArchive: true
        }
    }
}
