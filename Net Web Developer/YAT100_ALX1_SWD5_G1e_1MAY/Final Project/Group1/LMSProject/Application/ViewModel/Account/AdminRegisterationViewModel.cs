using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.Account
{

    public class AdminRegisterationViewModel
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

        [Required]
        public string? Address { get; set; }

        [Required]
        public string? Phone { get; set; }

        [Required]
        [Display(Name = "Setup Key ")]
        public string SetupKey { get; set; }  // Add SetupKey field here


    }
}