variable "public_subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "List of private subnet IDs"
  type        = list(string)
}
variable "launch_template_id" {
  description = "ID of the launch template to use in autoscaling"
  type        = string
}