using LMSProject.Data.Models;
using LMSProjectAUTH.Application.Services;
using LMSProjectAUTH.Application.ViewModel.Borrow;
using LMSProjectAUTH.Application.ViewModel.Member;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LMSProjectAUTH.Controllers
{
    [Authorize(Roles = "Librarian")]
    public class BorrowController : Controller
    {
        private readonly BookService _bookService;
        private readonly MemberService _memberService;
        private readonly BorrowService _borrowService;
        private readonly BookStoreService _bookStoreService;
        private readonly LibrarianService _librarianService;
        private readonly AppDBContext _context;

        public BorrowController(BookService bookService, MemberService memberService, BorrowService borrowService, BookStoreService bookStoreService,LibrarianService librarianService, AppDBContext context)
        {
            _bookService = bookService;
            _memberService = memberService;
            _borrowService = borrowService;
            _bookStoreService = bookStoreService;
            _librarianService = librarianService;
            _context = context;
            //TempData["toastType"] = "success";
        }

        public async Task<IActionResult> Index()
        {
            BorrowfVM borrowVM = new BorrowfVM
            {
                BorrowDate = DateTime.Today,
                DefaultReturnDate = DateTime.Today.AddDays(7)
            };

            var lstObjdb = await _bookService.GetFAllWithDetailsAsync();
            borrowVM.Books = lstObjdb.ToList();

            var lstMemberdb = await _memberService.GetAllAsync();
            borrowVM.Members = lstMemberdb.Where(m => m.IsActive).ToList();

            return View(borrowVM);
        }

        [HttpPost]
        public async Task<IActionResult> Borrow(BorrowfVM borrowVM)
        {

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int librarianID = await _librarianService.GetLibrarianIdByApplicationIDAsync(userIdString);


            AddBorrowVM addBorrowVM = new AddBorrowVM
            {
                BorrowDate = borrowVM.BorrowDate,
                MemberId = borrowVM.MemberId,
                DefaultReturnDate = borrowVM.DefaultReturnDate,
                Note = borrowVM.Note,
                PrintSerial = borrowVM.SelectedPrintSerial,
                LBId = librarianID// Set LBId directly here
            };

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    // Edit the book store
                    await _bookStoreService.EditBookStoreAsync(addBorrowVM.PrintSerial);

                    // Add a borrow record
                    await _borrowService.AddBorrowAsync(addBorrowVM);

                    // Commit the transaction
                    await transaction.CommitAsync();
                    TempData["message"] = "Book has been borrowed Successfully";
                    TempData["toastType"] = "success";
                    return RedirectToAction("Index");
                }
                catch (Exception ex)
                {
                    // Rollback the transaction if any operation fails
                    await transaction.RollbackAsync();
                    TempData["message"] = "An error occurred while processing your request.";
                    TempData["toastType"] = "error";
                    return RedirectToAction("Index");
                }
            }
        }
    }

}
