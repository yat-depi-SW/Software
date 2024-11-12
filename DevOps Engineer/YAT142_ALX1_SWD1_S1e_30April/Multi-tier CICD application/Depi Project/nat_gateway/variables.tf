variable "public_subnet_ids" {
  description = "The IDs of the public subnets"
  type        = list(string)
}
variable "private_subnet_ids" {
  description = "The IDs of the private subnets"
  type        = list(string)
}
variable "vpc_id" {
  description = "VPC ID where the launch template resources should be created"
  type        = string
}