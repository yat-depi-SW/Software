using LMSProject.Application.ViewModel.Genre;
using LMSProjectAUTH.Application.ViewModel.BookStore;
using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.Book
{
    public class BookfVM
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

        // Add a collection of BookStoreVM to represent related BookStores
        public ICollection<BookStoreVM> BookStore { get; set; } = new List<BookStoreVM>();
    }
}
