
output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_subnet_ids" {
  value = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  value = module.vpc.private_subnet_ids
}


#output "load_balancer_dns" {
  #value = module.load_balancer.aws_lb.web_lb.dns_name
#}

#output "autoscaling_group_name" {
 # value = module.autoscaling.aws_autoscaling_group.web.name
#}
