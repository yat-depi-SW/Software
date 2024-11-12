using System.ComponentModel.DataAnnotations;

namespace LMSProject.Data.Models.Models
{
    public class Librarian
    {

        public int Id { get; set; }


        [Display(Name ="Hired Date")]
        public DateOnly? HiredOn { get; set; }

        //Auto Generate No
        [Display(Name = "Librarian No")]
        [Required]
        public string LibrarianNo { get; set; }


        [Display(Name = "Is Active")]
        public bool IsActive { get; set; } = true    ;   

        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

       
    }
}
