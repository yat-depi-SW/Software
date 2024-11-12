variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}
variable "ami" {
   type        = string
   description = "Ubuntu AMI ID"
   default     = "ami-08eb150f611ca277f"
}

variable "instance_type" {
   type        = string
   description = "Instance type"
   default     = "t2.micro"
}

variable "name_tag" {
   type        = string
   description = "Name of the EC2 instance"
   default     = "APP-EC2"
}
