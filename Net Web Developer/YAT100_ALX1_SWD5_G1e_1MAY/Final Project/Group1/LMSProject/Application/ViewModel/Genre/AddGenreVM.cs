using System.ComponentModel.DataAnnotations;

namespace LMSProject.Application.ViewModel.Genre
{
    public class AddGenreVM
    {
        [Required]
        [Display(Name = "Genre")]
        public string Name { get; set; }
    }
}
