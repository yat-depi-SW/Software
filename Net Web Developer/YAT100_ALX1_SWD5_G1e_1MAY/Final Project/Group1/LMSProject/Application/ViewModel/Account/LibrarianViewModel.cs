using System.ComponentModel.DataAnnotations;

namespace LMSProject.Application.ViewModel.Account
{
    public class LibrarianViewModel
    {

        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }  // This should match what you're using in the service
        public string? Email { get; set; }

        [Required]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Display(Name = "Confirm Password")]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }


        [Required]
        [Display(Name = "Full Name")]
        public string Name { get; set; }      // Full name



        [Required]
        [Display(Name = "National ID")]
        [MaxLength(14, ErrorMessage = "National ID must contain 14 digits.")]

        public string NID { get; set; }


        public string? Address { get; set; }
        public string? Phone { get; set; }

        [Required]
        public string LibrarianNo { get; set; }
        public DateOnly HiredOn { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    }
}
