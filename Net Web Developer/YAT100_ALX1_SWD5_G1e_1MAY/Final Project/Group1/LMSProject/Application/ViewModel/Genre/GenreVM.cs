using System.ComponentModel.DataAnnotations;

namespace LMSProject.Application.ViewModel.Genre
{
    public class GenreVM
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Genre")]
        public string Name { get; set; }
    }
}
