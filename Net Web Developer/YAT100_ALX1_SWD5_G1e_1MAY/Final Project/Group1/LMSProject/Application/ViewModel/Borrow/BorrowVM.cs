using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.Book;

namespace LMSProjectAUTH.Application.ViewModel.Borrow
{
    public class BorrowVM
    {
        public DateTime SelectedDate { get; set; }
        public List<BookVM> Books { get; set; }

        public DateTime DefaultReturnDate { get; set; }
        public string Note { get; set; }

        // Add a property to hold the selected book's PrintSerials
        // public List<int> SelectedPrintSerials { get; set; } = new List<int>(); // Holds PrintSerials of selected Book
        public int SelectedPrintSerial { get; set; }
    }
}
