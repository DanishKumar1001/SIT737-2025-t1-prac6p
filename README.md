# SIT737-2025-t1-prac6p
Dockerized Node.js calculator microservice deployed on Kubernetes for SIT737 Task 6.1P. Includes Dockerfile, Kubernetes deployment and service configurations, setup instructions, and examples to interact with the application through Kubernetes CLI.

# 🧮 Calculator Microservice – Kubernetes Deployment
This project demonstrates the deployment of a Dockerized Node.js calculator microservice onto a Kubernetes cluster as part of SIT737 Task 6.1P. It includes Docker containerization, Kubernetes deployment and service configuration, and detailed instructions to access and interact with the application.

# 🚀 Technologies Used

Node.js
Express.js
Docker
Docker Compose
Kubernetes
Kubernetes CLI (kubectl)

# ⚙️ Setup and Deployment Instructions

## 1. Build and Push Docker Image

docker build -t calculator-microservice .
docker tag calculator-microservice your-dockerhub-username/calculator-microservice:latest
docker push your-dockerhub-username/calculator-microservice:latest

## 2. Deploy Application to Kubernetes

### Apply the Deployment:

kubectl apply -f deployment.yaml

### Apply the Service:

kubectl apply -f service.yaml

### Check status:

kubectl get deployments
kubectl get pods
kubectl get services

## 3. Access the Application

After deploying, access the application using:

http://localhost:<NodePort>/

### Example:

http://localhost:32008/

## 4. Test API Endpoints

Operation	URL Example
Addition	http://localhost:32008/add?num1=5&num2=3
Subtraction	http://localhost:32008/subtract?num1=10&num2=4
Multiplication	http://localhost:32008/multiply?num1=2&num2=6
Division	http://localhost:32008/divide?num1=8&num2=2

✅ You can test using a browser, curl, or Postman.

## 5. Error Testing

### Missing parameters:


http://localhost:32008/add?num1=5

#### Division by zero:

http://localhost:32008/divide?num1=10&num2=0

The application will respond with proper JSON error messages.

# 📦 Files Description

File	Purpose
Dockerfile	Instructions to build the Docker image
docker-compose.yml	(Optional) Local multi-container setup with health check
deployment.yaml	Kubernetes Deployment configuration for pods
service.yaml	Kubernetes Service configuration to expose pods
calculator.js	Main Node.js application with RESTful API
package.json	Project dependencies and metadata
package-lock.json	Locked versions of dependencies

#  Reference Links:

Docker - https://docs.docker.com/
Kubernetes - https://kubernetes.io/docs/home/