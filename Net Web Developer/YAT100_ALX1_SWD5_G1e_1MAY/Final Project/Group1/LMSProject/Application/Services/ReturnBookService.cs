using AutoMapper;
using AutoMapper.Execution;
using LMSProject.Application.Repository.Interface;
using LMSProject.Application.Repository.Repository;
using LMSProject.Application.ViewModel.Genre;
using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.Services;
using LMSProjectAUTH.Application.ViewModel.Borrow;
using LMSProjectAUTH.Application.ViewModel.Member;
using LMSProjectAUTH.Application.ViewModel.ReturnBook;
using LMSProjectAUTH.Controllers;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using System.Linq;
using static LMSProjectAUTH.Application.ViewModel.ReturnBook.ReturnBookVM;

namespace LMSProjectAUTH.Application.Services
{
    public class ReturnBookService
    {
       

        private readonly IUnitOfWork _unitOfWork;

        public ReturnBookService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Get Member List as SelectListItems for the search form
        public async Task<List<SelectListItem>> GetMemberListAsync()
        {
            var members = await _unitOfWork.ReturnRepository.GetMembersAsync();
            return members
                .Select(m => new SelectListItem
                {
                    Value = m.Id.ToString(),
                    Text = m.MemberNo
                })
                .ToList();
        }

        // Get Member Details and map to ViewModel
        public async Task<MemberDetailsVM> GetMemberDetailsAsync(int memberId)
        {
            var member = await _unitOfWork.ReturnRepository.GetMemberByIdAsync(memberId);
            if (member != null)
            {
                return new MemberDetailsVM
                {
                    Id = member.Id,
                    MemberNo = member.MemberNo,
                    Name = member.ApplicationUser.Name,
                    Email = member.ApplicationUser.Email,
                    Phone = member.ApplicationUser.PhoneNumber
                };
            }
            return null;
        }

        // Get Borrowed Books and map to ViewModel
        public async Task<List<BorrowedBookDetailsVM>> GetBorrowedBooksAsync(int memberId)
        {
            var borrows = await _unitOfWork.ReturnRepository.GetBorrowsByMemberIdAsync(memberId);
            var borrowedBooks = borrows.Select(b => new BorrowedBookDetailsVM
            {
                Id = b.Id,
                PrintSerial = b.PrintSerial,
                MemberId = b.MemberId,
                LRID = b.LRId,
                MemberNo = b.Member.MemberNo,
                BookTitle = b.BookStore.Book.Title,
                BorrowDate = b.BorrowDate,
                DefaultReturnDate = b.DefaultReturnDate,
                ReturnDate = b.ReturnDate
            }).ToList();

            return borrowedBooks;
        }

        // Update Return Date
        public async Task<bool> UpdateReturnDateAsync(int borrowId, int librarianId)
        {
            var borrowRecord = await _unitOfWork.ReturnRepository.GetBorrowByIdAsync(borrowId);
            if (borrowRecord != null)
            {
                var bookRecord = borrowRecord.BookStore;
                if (bookRecord != null)
                {
                    // Update ReturnDate to today's date
                    borrowRecord.ReturnDate = DateTime.Today;
                    borrowRecord.LRId = librarianId;
                    bookRecord.IsAvaliable = true;

                    await _unitOfWork.ReturnRepository.SaveAsync();
                    return true;
                }
            }

            return false;
        }
    }
}


