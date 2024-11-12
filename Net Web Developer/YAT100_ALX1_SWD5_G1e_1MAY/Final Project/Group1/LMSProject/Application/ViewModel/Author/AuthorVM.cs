using System.ComponentModel.DataAnnotations;

namespace LMSProject.Application.ViewModel.Author
{
    public class AuthorVM
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Author Name")]
        public string Name { get; set; }
    }
}
