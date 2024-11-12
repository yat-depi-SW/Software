using LMSProject.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace LMSProjectAUTH.Controllers
{
    public class AdminDbController : Controller
    {
        private readonly AppDBContext _context;

        public AdminDbController(AppDBContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            var membertotol=_context.Members.ToList().Count();
            var bookstotal=_context.Books.ToList().Count();
            var bookCopiesstotal = _context.BookStores.ToList().Count();
            var totalauthor=_context.Authors.Count();
            var totalgenre=_context.Genres.Count();
            var unBorrowedBooks=_context.BookStores.Where(x=>x.IsAvaliable).Count();
            var BorrowedBooks=_context.BookStores.Where(x => !x.IsAvaliable).Count();
            var delayedBook = _context.Borrows.Where(x => x.ReturnDate == null && x.DefaultReturnDate < DateTime.Today).Count();

            ViewBag.membertotol = membertotol;
            ViewBag.bookstotal = bookstotal;
            ViewBag.BookCopiesstotal = bookCopiesstotal;
            ViewBag.Totalauthor = totalauthor;
            ViewBag.totalgenre = totalgenre;
            ViewBag.unBorrowedBooks=unBorrowedBooks;
            ViewBag.BorrowedBooks=BorrowedBooks;
            ViewBag.delayedBook = delayedBook;

            return View();
        }
    }
}
