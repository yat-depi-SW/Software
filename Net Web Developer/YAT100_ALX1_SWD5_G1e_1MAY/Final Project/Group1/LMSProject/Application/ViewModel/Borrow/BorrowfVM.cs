using LMSProjectAUTH.Application.ViewModel.Book;
using LMSProjectAUTH.Application.ViewModel.BookStore;
using LMSProjectAUTH.Application.ViewModel.Member;

namespace LMSProjectAUTH.Application.ViewModel.Borrow
{
    public class BorrowfVM
    {
        public DateTime BorrowDate { get; set; }
        public List<BookfVM> Books { get; set; }

        public List<MemberVM> Members { get; set; }
        public DateTime DefaultReturnDate { get; set; }
        public int MemberId { get; set; }
        public string Note { get; set; }

        public int LBId { get; set; }
        // Add a property to hold the selected book's PrintSerials
        // public List<int> SelectedPrintSerials { get; set; } = new List<int>(); // Holds PrintSerials of selected Book
        public int SelectedPrintSerial { get; set; }

        // Add a collection of BookStoreVM to represent related BookStores
        public ICollection<BookStoreVM> BookStore { get; set; } = new List<BookStoreVM>();


    }
}
