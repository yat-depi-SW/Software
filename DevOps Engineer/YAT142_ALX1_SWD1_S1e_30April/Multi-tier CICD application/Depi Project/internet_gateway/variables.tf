variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}
variable "public_subnet_ids" {
  description = "List of public subnet IDs to associate with the route table"
  type        = list(string)
}