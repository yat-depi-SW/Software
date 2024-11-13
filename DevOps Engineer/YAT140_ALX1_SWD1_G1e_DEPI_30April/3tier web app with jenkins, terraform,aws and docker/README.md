# DEPI-FinalProject
AutomatedBuildingWebsite-DevSecOps

## Introduction
In today’s fast-paced world of cloud computing, the ability to rapidly and efficiently provision infrastructure is a game-changer. This is where Infrastructure as Code (IaC) comes into play, allowing us to define and manage our infrastructure in a code-based manner. In this blog post, we will explore how to harness the power of IaC by using two essential tools: Terraform and Jenkins, in conjunction with Amazon Web Services (AWS).

Terraform is an open-source IaC tool that enables us to define, create, and manage our infrastructure using declarative configuration files. Jenkins, on the other hand, is a widely adopted automation server that helps streamline the software development and deployment process.

## Prerequisites
1. AWS Account: You must have an active AWS account with administrative privileges or the necessary permissions to create and manage AWS resources.
2. S3 Bucket for Terraform State:
** Purpose: To securely store your Terraform state files remotely.
3. DynamoDB Table for Locking Capability:
** Purpose: To enable locking for Terraform state management.
4. Jenkins Setup.
5. Terraform Installation in Jenkins:
==> Terraform should be installed on the Jenkins server to execute Terraform scripts as part of your CI/CD pipeline.
6. Terraform Files in Source Code Management (SCM)
7. IAM Role for Jenkins EC2 Instance.
