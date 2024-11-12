using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.BookStore
{
    public class BookStoreVM
    {
        public int PrintSerial { get; set; } // Unique identifier for the BookStore (PrintSerial)

        [Display(Name = "Is Available")]
        public bool IsAvaliable { get; set; } // Availability status of the book

        // Optionally, if you need to display the BookId (foreign key to the Book):
        public int BookId { get; set; }
    }
}
