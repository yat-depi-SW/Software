using System.ComponentModel.DataAnnotations;

namespace LMSProject.Application.ViewModel.Account
{
    public class MemberViewModel
    {
        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }  // For IdentityUser's UserName property
        public string? Email { get; set; }     // For IdentityUser's Email property

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
        public string Name { get; set; }      // Full name (custom property)


        [Required]
        [Display(Name = "National ID")]
        [MaxLength(14, ErrorMessage = "National ID must contain 14 digits.")]
        public string NID { get; set; }       // National ID (custom property)

        public string? Address { get; set; }  // Optional address field
        public string? Phone { get; set; }    // Optional phone field (can use IdentityUser.PhoneNumber)

        [Required]
        [Display(Name = "Memeber No")]
        public string MemberNo { get; set; }  // Unique member number

        [Display(Name = "Subscribe Date")]
        public DateOnly? SubscribeDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        //  [Display(Name = "Cancel Subscribe on")]
        //   public DateOnly? SubscribeEndOn { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    }
}
