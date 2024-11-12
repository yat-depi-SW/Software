using LMSProject.Data.Models;
using LMSProjectAUTH.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Controllers
{
    [Authorize]
    public class MemberDBController : Controller
    {
        private readonly MemberService _memberService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly AppDBContext _context;

        public MemberDBController(MemberService memberService,
            UserManager<ApplicationUser> userManager, AppDBContext context
            )
        {
            _memberService = memberService;
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]

        public async Task<IActionResult> Index()
        {
            var userId = _userManager.GetUserId(User);

            // Use the service to retrieve the member's ID
            var memberId = await _memberService.GetMemberIdByUserAsync(userId);

            if (memberId == null)
            {
                return NotFound("Member not found for this user.");
            }

            var totalBorrowsBookTillNow= _context.Borrows.Where(m => m.MemberId == memberId).Count();
            var totalBorrowedBooks = _context.Borrows.Where(d => d.ReturnDate == null && d.MemberId==memberId).Count();
            var delayedBook = _context.Borrows.Where(x => x.ReturnDate == null &&
                                        x.DefaultReturnDate < DateTime.Today &&
                                        x.MemberId==memberId).Count();

            var score = _memberService.GetMemberScore(memberId);

            ViewBag.totalBorrowsBookTillNow=totalBorrowsBookTillNow;
            ViewBag.totalBorrowedBooks= totalBorrowedBooks; 
            ViewBag.delayedBook=delayedBook;
            ViewBag.score=score;    
            return View();
        }
        public async Task< IActionResult> Profile()
        {
            // Get the currently logged-in user's ID
            var userId = _userManager.GetUserId(User);

            // Use the service to retrieve the member's ID
            var memberId = await _memberService.GetMemberIdByUserAsync(userId);

            if (memberId == null)
            {
                return NotFound("Member not found for this user.");
            }

            var memberProfile = await _memberService.GetMemberProfile(memberId);

            return View(memberProfile);
        }

        [HttpGet]
        public async Task<IActionResult> MemberBorrowHistory()
        {
            // Get the currently logged-in user's ID
            var userId = _userManager.GetUserId(User);

            // Use the service to retrieve the member's ID
            var memberId = await _memberService.GetMemberIdByUserAsync(userId);

            if (memberId == null)
            {
                return NotFound("Member not found for this user.");
            }

            var memberhistory= await _memberService.BorrowHistoryByMember(memberId);

            return View(memberhistory);
        }

        [HttpGet]
        public async Task<IActionResult> MemberPenaltyHistory(int userid)
        {
            // Get the currently logged-in user's ID
            var userId = _userManager.GetUserId(User);

            // Use the service to retrieve the member's ID
            var memberId = await _memberService.GetMemberIdByUserAsync(userId);

            if (memberId == null)
            {
                return NotFound("Member not found for this user.");
            }

            var memberhistory = await _memberService.GetPenaltyHistoryByMember(memberId);

            return View(memberhistory);
        }

        [HttpGet]
        public async Task<IActionResult> MemberPenaltyActive(int userid)
        {
            // Get the currently logged-in user's ID
            var userId = _userManager.GetUserId(User);

            // Use the service to retrieve the member's ID
            var memberId = await _memberService.GetMemberIdByUserAsync(userId);

            if (memberId == null)
            {
                return NotFound("Member not found for this user.");
            }

            var memberActivePenalty = await _memberService.GetPenaltyActiveByMember(memberId);

            return View(memberActivePenalty);
        }
    }
}
