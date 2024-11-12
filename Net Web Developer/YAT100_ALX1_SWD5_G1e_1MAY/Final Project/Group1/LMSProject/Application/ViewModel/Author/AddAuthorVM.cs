using System.ComponentModel.DataAnnotations;

namespace LMSProject.Application.ViewModel.Author
{
    public class AddAuthorVM
    {

        [Required]
        [Display(Name = "Author Name")]
        public string Name { get; set; }
    }
}
