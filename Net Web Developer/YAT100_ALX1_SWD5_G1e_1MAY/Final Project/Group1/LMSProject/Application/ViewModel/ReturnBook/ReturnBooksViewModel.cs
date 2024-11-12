using LMSProjectAUTH.Application.ViewModel.Borrow;
using LMSProjectAUTH.Application.ViewModel.Member;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace LMSProjectAUTH.Application.ViewModel.ReturnBook
{
    public class ReturnBooksViewModel
    {
        public MemberDetailsVM MemberDetails { get; set; }
        public IEnumerable<BorrowedBookDetailsVM> BorrowedBooks { get; set; }
        public List<SelectListItem> MemberList { get; set; }
    }
}
