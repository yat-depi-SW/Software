using System.ComponentModel.DataAnnotations;

namespace LMSProject.Data.Models.Models
{
    public class Member
    {
        public int Id { get; set; }


        // Member No Auto Generate
        [Display(Name = "Member No")]
        [Required]
        public string MemberNo { get; set; }


        [Display(Name = "Subscribe Date")]
        public DateOnly SubscribeDate { get; set; }


        [Display(Name = "Subscribe End on")]
        public DateOnly SubscribeEndOn { get; set; }

        

        [Display(Name = "Is Active")]
        public bool IsActive { get; set; }=true;

        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

       // public ICollection<Borrow> Borrows { get; set; }

    }
}
