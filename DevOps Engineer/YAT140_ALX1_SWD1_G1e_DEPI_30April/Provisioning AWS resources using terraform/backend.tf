terraform {
  backend "s3" {
    bucket         = "mybucket00002025"
    key            = "my-terraform-environment/main"
    region         = "us-east-1"
    dynamodb_table = "mydynamodb-table"
  }
}
