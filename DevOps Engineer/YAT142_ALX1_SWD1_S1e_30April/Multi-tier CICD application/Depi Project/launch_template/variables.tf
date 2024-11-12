variable "vpc_id" {
  description = "VPC ID where the launch template resources should be created"
  type        = string
}
variable "lb_security_group_id" {
  description = "Security Group ID for the Load Balancer"
  type        = string
}