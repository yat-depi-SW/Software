using System.ComponentModel.DataAnnotations;

namespace LMSProject.Data.Models.Models
{
    public class Genre
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Genre")]
        public string Name { get; set; }

        public IEnumerable<Book>? Books { get; set; }
    }
}
