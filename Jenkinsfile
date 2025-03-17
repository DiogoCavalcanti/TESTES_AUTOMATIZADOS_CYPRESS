pipeline {
    agent any
     options {
        ansiColor('xterm')  // Ativa a interpretação de cores ANSI
    }
    environment {
        NODE_OPTIONS = "--max_old_space_size=4096"  // Ajuste para evitar problemas de memória no Node.js
    }

    stages {
        /*stage('Checkout') {
            steps {
                git branch: 'apis', url: 'https://github.com/DiogoCavalcanti/TESTES_AUTOMATIZADOS_CYPRESS.git'
            }
        }
        
        stage('Set Proxy'){
            steps{
                sh "npm config set proxy http://127.0.0.1:3128"
            }
        }*/

        stage('Install Dependencies') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        sh 'npm install'
                    } else {
                        error "Arquivo package.json não encontrado!"
                    }
                }
            }
        }

        stage('Run Cypress') {
            parallel {
                stage('ProtocoloComAudiencia_Session') {
                    steps {
                         sh 'npx cypress run --spec "cypress/e2e/APIs/05-fluxoAgrupadoSession.cy.js"'
                    }
                }
                stage('ProtocoloComAudiencia_Comum') {
                    steps {
                         sh 'npx cypress run --spec "cypress/e2e/APIs/06-fluxoAgrupadoComum.cy.js"'
                    }
                }
                
                stage('ProtocoloSemAudiencia') {
                    steps {
                         sh 'npx cypress run --spec "cypress/e2e/APIs/PROTOCOLAR_PROCESSO.cy.js"'
                    }
                }
                
                stage('SetupRemessas') {
                    steps {
                         sh 'npx cypress run --spec "cypress/e2e/APIs/07-fluxoSetupRemessas.cy.js"'
                    }
                }
            }
        }

        stage('Gerar Relatorios') {
            steps {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cypress/reports/html',
                    reportFiles: 'index.html',
                    reportName: 'Cypress Test Report'
                ])
            }
        }
    }

    post {
        success {
            echo "Pipeline executado com sucesso!"
        }
        failure {
            echo "Ocorreu um erro na execução do pipeline!"
        }
    }
}