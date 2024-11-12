provider "aws" {
  region = var.region
}

# Import other resources
module "vpc" {
  source              = "./vpc"
  vpc_cidr           = var.vpc_cidr
  public_subnet_cidrs = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
}



module "internet_gateway" {
  source = "./internet_gateway"
  vpc_id = module.vpc.vpc_id
  public_subnet_ids=module.vpc.public_subnet_ids

}

module "nat_gateway" {
  source = "./nat_gateway"
  vpc_id = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  private_subnet_ids = module.vpc.private_subnet_ids
}

module "security_groups" {
  source = "./security_groups"
  vpc_id = module.vpc.vpc_id
}

module "launch_template" {
  source = "./launch_template"
  vpc_id = module.vpc.vpc_id
  lb_security_group_id = module.security_groups.lb_sg_id
}

module "target_group" {
  source = "./target_group"
  vpc_id = module.vpc.vpc_id
}

module "load_balancer" {
  source = "./load_balancer"
  lb_security_group_id = module.security_groups.lb_sg_id
  public_subnet_ids = module.vpc.public_subnet_ids
  web_tg_arn = module.target_group.web_tg_arn


}

module "autoscaling" {
  source = "./autoscaling"
  public_subnet_ids     = module.vpc.public_subnet_ids
  private_subnet_ids    = module.vpc.private_subnet_ids
  launch_template_id=module.launch_template.launch_template_id
}
