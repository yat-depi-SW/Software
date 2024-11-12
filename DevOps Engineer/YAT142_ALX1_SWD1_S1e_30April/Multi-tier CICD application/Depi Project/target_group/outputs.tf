output "web_tg_arn" {
  description = "The ARN of the web target group"
  value       = aws_lb_target_group.web_tg.arn
}