using LMSProject.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Controllers
{
    public class LibrarianDBController : Controller
    {
        private readonly AppDBContext _context;

        public LibrarianDBController(AppDBContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            
            var bookstotal = _context.Books.ToList().Count();
            var bookCopiesstotal = _context.BookStores.ToList().Count();
            
            var unBorrowedBooks = _context.BookStores.Where(x => x.IsAvaliable).Count();
            var BorrowedBooks = _context.BookStores.Where(x => !x.IsAvaliable).Count();
            var delayedBook = _context.Borrows.Where(x => x.ReturnDate == null && x.DefaultReturnDate < DateTime.Today).Count();

            
            ViewBag.bookstotal = bookstotal;
            ViewBag.BookCopiesstotal = bookCopiesstotal;
          
            ViewBag.unBorrowedBooks = unBorrowedBooks;
            ViewBag.BorrowedBooks = BorrowedBooks;
            ViewBag.delayedBook = delayedBook;

            return View();
        }
    }
}
