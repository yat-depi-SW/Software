using System.ComponentModel.DataAnnotations;

namespace LMSProject.Data.Models.Models
{
    public class Author
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Author Name")]
        public string Name { get; set; }

        public ICollection<Book>? Books { get; set; }
    }
}
