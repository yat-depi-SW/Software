using System.ComponentModel.DataAnnotations;

namespace LMSProject.Data.Models.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
        [Display(Name="Title")]
        public string Title { get; set; }

        [Required]
        [Display(Name ="Book Price")]
        public decimal BookPrice { get; set; }


        public int PenalityPercentage { get; set; }
        public ICollection<BookStore> BookStore { get; set; }
    

        public int GenreID { get; set; }
        public Genre Genre { get; set; }


        public int AuthorId { get; set; }
        public Author Authors { get; set; }

        public byte[] BookPhoto { get; set; }



    }
}
