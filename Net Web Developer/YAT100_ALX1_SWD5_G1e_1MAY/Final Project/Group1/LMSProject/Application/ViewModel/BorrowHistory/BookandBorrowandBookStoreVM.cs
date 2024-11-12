using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace LMSProjectAUTH.Application.ViewModel.BorrowHistory
{
    public class BookandBorrowandBookStoreVM
    {

        //[Display(Name = "Member Name")]
        //public string MemberName { get; set; }
        
        
        //[Display(Name = "Member No")]
        //public string MemberNo { get; set; }


        [Display(Name = "Book Title")]
        public string BookTitle { get; set; }
       
        public string Author { get; set; }

        [Display(Name = "Genre")]
        public string GenereOfBook { get; set; }

        [Display(Name = "Borrow Date")]
        public DateTime BorrowDate { get; set; }

        [Display(Name = "To be Return On")]
        public DateTime DefaultReurnDate { get; set; }

        public DateTime? ReturnDate { get; set; }
        public string Status { get; set; }

        public bool HasPenalty { get; set; } = false;

    }
}
