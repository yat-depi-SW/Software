resource "aws_internet_gateway" "main" {
  vpc_id = var.vpc_id
  tags = {
    Name = "main-internet-gateway"
  }
}

resource "aws_route_table" "public" {
  vpc_id = var.vpc_id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "public-route-table"
  }
}

resource "aws_route_table_association" "public" {
  count = 3
  subnet_id = var.public_subnet_ids[count.index]
  route_table_id = aws_route_table.public.id
}
