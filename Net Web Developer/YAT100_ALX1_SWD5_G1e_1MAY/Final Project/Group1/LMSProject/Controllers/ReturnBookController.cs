using LMSProject.Application.Repository.Interface;
using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.Services;
using LMSProjectAUTH.Application.ViewModel.Borrow;
using LMSProjectAUTH.Application.ViewModel.Member;
using LMSProjectAUTH.Application.ViewModel.ReturnBook;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Controllers
{
    [Authorize(Roles = "Librarian")]
    public class ReturnBookController : Controller
    {
        private readonly ReturnBookService _returnBookService;
        private readonly IUserService _userService; // Service to get current user information

        public ReturnBookController(ReturnBookService returnBookService, IUserService userService)
        {
            _returnBookService = returnBookService;
            _userService = userService;
        }

        public async Task<IActionResult> Index(int? selectedMemberId)
        {
            var viewModel = new ReturnBooksViewModel
            {
                MemberList = await _returnBookService.GetMemberListAsync()
            };

            if (selectedMemberId.HasValue)
            {
                viewModel.MemberDetails = await _returnBookService.GetMemberDetailsAsync(selectedMemberId.Value);
                if (viewModel.MemberDetails != null)
                {
                    viewModel.BorrowedBooks = await _returnBookService.GetBorrowedBooksAsync(selectedMemberId.Value);
                }
            }

            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateReturnDate(int borrowId)
        {
            // Assuming you have a way to get the current librarian's ID
            int librarianId = 1;// _userService.GetCurrentUserId();

            bool isSuccess = await _returnBookService.UpdateReturnDateAsync(borrowId, librarianId);

            TempData["Result"] = isSuccess ? "success" : "failed";

            return RedirectToAction("Index");
        }
    }

}
