using AutoMapper;
using LMSProject.Application.Repository.Interface;
using LMSProject.Application.Repository.Repository;
using LMSProject.Application.Services;
using LMSProject.Application.ViewModel.Author;
using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.Services;
using LMSProjectAUTH.Application.ViewModel.Borrow;
using LMSProjectAUTH.Application.ViewModel.Member;
using LMSProjectAUTH.Application.ViewModel.Penalty;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Controllers
{
    [Authorize(Roles = "Librarian")]
    public class PenaltyController : Controller
    {
      
        
        private readonly ReturnBookService _returnBookService;
        private readonly IUserService _userService;
        private readonly PenaltyService _penaltyService;

        public PenaltyController(  
            ReturnBookService returnBookService, IUserService userService, PenaltyService penaltyService)
        {
          
            _returnBookService = returnBookService;
            _userService = userService;
            _penaltyService = penaltyService;
        }


        public async Task<IActionResult> Details(int borrowId)
        {
            if (borrowId <= 0)
            {
                return BadRequest("Invalid borrow ID.");
            }

            // Get the borrow record
            var borrowRecord = await _penaltyService.GetBorrowRecordAsync(borrowId);
            if (borrowRecord == null)
            {
                return NotFound("Borrow record not found.");
            }

            // Calculate penalty details
            var penaltyDetails = _penaltyService.CalculatePenaltyDetails(borrowRecord);

            // Get or create the penalty record
            var penaltyRecord = await _penaltyService.GetOrCreatePenaltyRecordAsync(borrowId, penaltyDetails);
            if (penaltyRecord == null)
            {
                return NotFound("Penalty record not found after saving.");
            }

            // Create the view model
            var penaltyVM = _penaltyService.CreatePenaltyViewModel(penaltyRecord);

            return View(penaltyVM);
        }
    
    

        [HttpPost]
        public async Task<IActionResult> MarkAsPaid(int penaltyId)
        {
            int librarianId = 1; // Replace with logic to get the logged-in librarian ID

            // Call the service method
            var (isSuccess, message) = await _penaltyService.MarkPenaltyAsPaidAsync(penaltyId, librarianId);

            // Display message to the user
            TempData["Message"] = message;

            // Redirect to the appropriate page
            if (isSuccess)
            {
                return RedirectToAction("Index", "ReturnBook");
            }

            // If unsuccessful, redirect to details page
            return RedirectToAction("Details", new { borrowId = penaltyId });
        }



    }
}

