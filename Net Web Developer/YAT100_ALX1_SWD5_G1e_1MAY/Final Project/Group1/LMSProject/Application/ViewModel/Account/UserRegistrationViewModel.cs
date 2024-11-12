using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.Account
{
    public class UserRegistrationViewModel
    {
        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }  // For IdentityUser's UserName property

        [EmailAddress]
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

        // Librarian-specific fields
        public string? LibrarianNo { get; set; }  // Auto-generated
        public DateOnly? HiredOn { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        // Member-specific fields
        public string? MemberNo { get; set; }  // Auto-generated
        public DateOnly? SubscribeDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        [Required]
        public string UserType { get; set; }  // Discriminator: "Librarian" or "Member"
    }

}
