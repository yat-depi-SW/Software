pipeline {
    agent {label 'Jenkins_slave'}

    stages{
        stage('prep'){
            steps {
                git 'https://github.com/IslamReda/jenkins_nodejs_example.git'
            }
        }
    
        stage('Build') {
            steps {
                withCredentials([usernamePassword(credentialsId: "docker",usernameVariable: "USER",passwordVariable: "PASS")]) {
                sh 'sudo docker build . -f Dockerfile -t ${USER}/depi-app'
                sh 'sudo docker login -u ${USER} -p ${PASS}'
                sh 'sudo docker push ${USER}/depi-app'
                }
            }
        }    
        
        stage('deploy') {
            steps {
                withCredentials([usernamePassword(credentialsId:"docker",usernameVariable:"USER",passwordVariable:"PASS")]) {
                sh 'sudo docker login -u ${USER} -p ${PASS}'
                git 'https://github.com/mohamedmedhat22/Devops-Projects.git'
                sh 'eksctl create cluster -f eks.yaml'
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl apply -f service.yaml'
                sh 'kubectl apply -f asg.yaml'
                sh 'curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/main/k8s-quickstart/cwagent-custom-resource-definitions.yaml | kubectl apply --server-side -f -'
                sh 'kubectl get svc'
                }
            }
        }
    }
        post {
            success {
                slackSend(channel: 'devops-project', color: 'good', message: "SUCESS: JOB '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
            failure {
                slackSend(channel: 'devops-project', color: 'danger', message: "FAILURE: JOB '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
        }
    
}    
