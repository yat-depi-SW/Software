using LMSProject.Data.Models.Models;
using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.Book
{
    public class BookDetialsVM
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "Book Price")]
        public decimal BookPrice { get; set; }

        [Display(Name = "Penality %")]
        public int PenalityPercentage { get; set; }

        [Display(Name = "Genre")]
        public string GenreType { get; set; }

        [Display(Name = "Author")]
        public string AuthorName { get; set; }

        [Display(Name = "Photo")]
        public byte[] BookPhoto { get; set; }

        [Display(Name = "Copies Number")]
        public int NoOfCopies { get; set; }
    }
}
