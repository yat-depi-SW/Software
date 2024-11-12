resource "aws_launch_template" "web" {
  name_prefix   = "web-template"
  image_id      = "ami-0866a3c8686eaeeba" 
  instance_type = "t2.micro"
  key_name      = aws_key_pair.my_key.key_name

  network_interfaces {
    associate_public_ip_address = true
    security_groups = [var.lb_security_group_id]
    # subnet_id = aws_subnet.public[0].id
  }
}

resource "aws_key_pair" "my_key" {
  key_name   = "my_key_name" 
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDRgR+ufsuNk3JPbsidXgJCuEE5Y6tcVEUFv1VV9DqJSngCTep22HlHgkaBxU8YXUJ2XCNaTC5NmxKbSdh8ldFsL2NhdEaZlw20SkHVpo5JTsYqXpYH/SVu9WcKaQKwQXkX81Sy19O8fY4TmXZRUVM67vtAnh5GCkLLJ9Hwco+ijZxIs891nc5TMefrBfESpAhPJZU1aoYkc21WCK+lh8RgXwRv0CkYTaMWZNXZhTAK4lZiZlbP4Cf1Jyw54AEa1RRMMZWCq6gQFNL78svEGtAXeIxjrrkhPiw69LPYhAf4EFzcwYlzVlahJmxwoYUvLYx6Uk3VXollYfNYyXpJ6C4eWF7nbPZa/nZXcasoy6IqzTWi4/9+xvi7kQsozszySYNjX+v0spsfq4p79PzLJ1adOOfOKYvHXsIa7q/PSq4VBfUszxLNk4VepQzxlS//Z2eWYHodE1wCakxW/m2uV5OAJepdDJrUq/sS8A442J0IVYc8HN6hT1IJJHiz9fMhM40= ahmed yasser@LAPTOP-45PEJ8AQ"  
}


