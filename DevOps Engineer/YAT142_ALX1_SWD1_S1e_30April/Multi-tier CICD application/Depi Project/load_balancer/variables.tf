variable "public_subnet_ids" {
  description = "The IDs of the public subnets"
  type        = list(string)
}
variable "lb_security_group_id" {
  description = "Security Group ID for the Load Balancer"
  type        = string
}
variable "web_tg_arn" {
  description = "The ARN of the target group to attach to the load balancer"
  type        = string
}