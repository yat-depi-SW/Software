using LMSProject.Application.ViewModel.Genre;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.BookStore;
using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.Book
{
    public class BookVM
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "Book Price")]
        public decimal BookPrice { get; set; }

        public int PenalityPercentage { get; set; }

        public int GenreID { get; set; } // Keep GenreID

        public GenreVM Genre { get; set; }

        public int AuthorId { get; set; }

        //public int NoofCopies { get; set; } = 1;
    }
}
