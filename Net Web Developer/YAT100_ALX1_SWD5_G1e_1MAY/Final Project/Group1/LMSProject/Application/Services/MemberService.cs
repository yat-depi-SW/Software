using AutoMapper;
using LMSProject.Application.Repository.Interface;
using LMSProject.Application.ViewModel.Genre;
using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.BorrowHistory;
using LMSProjectAUTH.Application.ViewModel.Member;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;


namespace LMSProjectAUTH.Application.Services
{
    public class MemberService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;
        private readonly AppDBContext _dbContext;
        private readonly PenaltyService _penaltyService;

        public MemberService(IUnitOfWork unitOfWork, IMapper mapper,
            AppDBContext appDBContext, PenaltyService penaltyService
            )
        {
            _unitOfWork = unitOfWork;
            _autoMapper = mapper;
            _dbContext = appDBContext;
            _penaltyService = penaltyService;
        }

        public async Task<IEnumerable<MemberDetailsVM>> GetAllMemberAsync()
        {
            var membersdb = await _unitOfWork.Member.GetAllAsync();
            var membersVM = _autoMapper.Map<IEnumerable<MemberDetailsVM>>(membersdb);
            return membersVM;
        }

        public async Task<MemberDetailsVM> GetMemberbyIdAsync(int memberId)
        {
            var memberdb = await _unitOfWork.Member.GetByIdAsync(memberId);
            var resultVM = _autoMapper.Map<MemberDetailsVM>(memberdb);
            return resultVM;
        }

        //dropdown list for member
        public List<SelectListItem> GetMembersForDropdown()
        {
            return _dbContext.Members.Select(a => new SelectListItem
            {
                Text = a.MemberNo,
                Value = a.Id.ToString()
            }).ToList();
        }

        public async Task<IEnumerable<MemberVM>> GetAllAsync()
        {

            var member = await _unitOfWork.Member.GetAllAsync();

            var memberVM = _autoMapper.Map<IEnumerable<MemberVM>>(member);

            return memberVM;
        }

        public async Task<int?> GetMemberIdByUserAsync(string userId)
        {
            var member = await _unitOfWork.Member
                .FindAsync(m => m.ApplicationUserId == userId);
            return member?.FirstOrDefault()?.Id;
        }



        public async Task<List<BookandBorrowandBookStoreVM>> BorrowHistoryByMember(int? memberid)
        {
            if (memberid == null)
            {
                throw new ArgumentException("Member ID is required.");
            }

            var borrowHistory = await _dbContext.Borrows
                .Include(b => b.BookStore)
                .ThenInclude(bs => bs.Book)
                .ThenInclude(book => book.Authors)
                .Include(b => b.BookStore.Book.Genre)
                .Where(m => m.MemberId == memberid)
                .OrderByDescending(d => d.BorrowDate)
                .Select(b => new BookandBorrowandBookStoreVM
                {
                    BookTitle = b.BookStore.Book.Title,
                    Author = b.BookStore.Book.Authors.Name,
                    GenereOfBook = b.BookStore.Book.Genre.Name,
                    BorrowDate = b.BorrowDate,
                    DefaultReurnDate = b.DefaultReturnDate,
                    ReturnDate = b.ReturnDate,
                    Status = b.ReturnDate.HasValue ? "Returned" : "Not Returned",
                    HasPenalty = !b.ReturnDate.HasValue || b.ReturnDate > b.DefaultReturnDate
                })
                .ToListAsync();

            return borrowHistory;
        }

       

        public async Task<List<MemberPenaltyHistoryVM>> GetPenaltyActiveByMember(int? memberid)
        {
            if (memberid == null)
            {
                throw new ArgumentException("Member ID is required.");
            }

            var penaltyHistory = await _dbContext.penalities
                .Include(b => b.Borrow)
                .ThenInclude(b => b.BookStore)
                .ThenInclude(b => b.Book)
                .Where(m => m.Borrow.MemberId == memberid && m.IsPaid == false)
                .OrderByDescending(d => d.Borrow.DefaultReturnDate)
                .Select(b => new MemberPenaltyHistoryVM
                {
                    BookTitle = b.Borrow.BookStore.Book.Title,
                    BorrowDate = b.Borrow.BorrowDate,
                    defaultReturnDate = b.Borrow.DefaultReturnDate,
                    ReturnDate = b.Borrow.ReturnDate,
                    PenaltyDays = _penaltyService.CalculateOverDays(b.Borrow.DefaultReturnDate),
                    PValue =(float) _penaltyService.CalculatePenalty(
                        (float)(((decimal)(b.Borrow.BookStore.Book.PenalityPercentage / 100.0)) * b.Borrow.BookStore.Book.BookPrice),
                                            _penaltyService.CalculateOverDays(b.Borrow.DefaultReturnDate))
                })
                .ToListAsync();

            return penaltyHistory;
        }


        //
        public async Task<List<MemberPenaltyHistoryVM>> GetPenaltyHistoryByMember(int? memberid)
        {
            if (memberid == null)
            {
                throw new ArgumentException("Member ID is required.");
            }

            var penaltyHistory = await _dbContext.penalities
                .Include(b => b.Borrow)
                .ThenInclude(b => b.BookStore)
                .ThenInclude(b => b.Book)
                .Where(m => m.Borrow.MemberId == memberid && m.IsPaid == true)
                .OrderByDescending(d => d.Borrow.DefaultReturnDate)
                .Select(b => new MemberPenaltyHistoryVM
                {
                    BookTitle = b.Borrow.BookStore.Book.Title,
                    BorrowDate = b.Borrow.BorrowDate,
                    ReturnDate = b.Borrow.ReturnDate,
                    PenaltyDays = b.PenaliteDays,
                    PValue = b.PValue
                })
                .ToListAsync();

            return penaltyHistory;
        }


        public async Task<MemberProfileVM> GetMemberProfile(int? memberid)
        {
            var MemberProfile = await _dbContext.Members
                .Include(b => b.ApplicationUser)
                //.Include(b => b.Borrows)
                //    .ThenInclude(b => b.Penalitie)
                .Where(m => m.Id == memberid)
                .Select(b => new MemberProfileVM
                {
                    Name = b.ApplicationUser.Name,
                    Address = b.ApplicationUser.Address,
                    NID = b.ApplicationUser.NID,
                    Phone = b.ApplicationUser.Phone,
                    MemberNo = b.MemberNo,
                    SubscribeDate = b.SubscribeDate,
                    IsActive = b.IsActive,
                    NoOfBorrowBooks = CountBorrowedBooksByMembers(memberid),
                    NoOfPenality = CountPenaliryByMembers(memberid),
                    Score=GetMemberScore(memberid)
                })
                .FirstOrDefaultAsync();

            return MemberProfile;
        }
        private int CountBorrowedBooksByMembers(int? memberid)
        {
            var totalBorrowedBooks = _dbContext.Borrows.Where(m => m.MemberId == memberid).Count();
            if (totalBorrowedBooks > 0) { return totalBorrowedBooks; }
            return 0;
        }

        private int CountPenaliryByMembers(int? memberid)
        {
            var totalPenaliryBooks = _dbContext.penalities.Include(b=>b.Borrow).Where(m => m.Borrow.MemberId == memberid).Count();
            if (totalPenaliryBooks > 0) { return totalPenaliryBooks; }
            return 0;
        }
        public double GetMemberScore(int? memberid)
        {
            var totalBorrowBooks = CountBorrowedBooksByMembers(memberid);
            var totalNoOfPenality = CountPenaliryByMembers(memberid);
            var score = (totalBorrowBooks - totalNoOfPenality) * 100 / totalBorrowBooks; /// .1;
            if (score > 0) { return score; }
            return 0;
        }
    }

   


}
