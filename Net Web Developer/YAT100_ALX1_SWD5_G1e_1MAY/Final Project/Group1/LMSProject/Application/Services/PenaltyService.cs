using AutoMapper;
using LMSProject.Application.Repository.Interface;
using LMSProject.Data.Models.Models;
using LMSProject.Data.Models;
using LMSProjectAUTH.Application.Repository.Interface;
using LMSProjectAUTH.Application.ViewModel.Penalty;
using LMSProjectAUTH.Application.Repository.Repository;
using Microsoft.EntityFrameworkCore;
using LMSProjectAUTH.Application.ViewModel.Member;

namespace LMSProjectAUTH.Application.Services
{
    public class PenaltyService
    {
        private readonly PenaltyRepository _penaltyRepository;
        private readonly ReturnBookService _returnBookService;

        public PenaltyService(PenaltyRepository penaltyRepository, ReturnBookService returnBookService)
        {
            _penaltyRepository = penaltyRepository;
            _returnBookService = returnBookService;
        }

        
        public async Task<Borrow?> GetBorrowRecordAsync(int borrowId)
        {
            return await _penaltyRepository.GetBorrowRecordAsync(borrowId);
        }

       
        public (int PenaltyDays, float PenaltyValue) CalculatePenaltyDetails(Borrow borrowRecord)
        {
           // float z =(float) (((decimal) (borrowRecord.BookStore.Book.PenalityPercentage / 100.0) )* borrowRecord.BookStore.Book.BookPrice);
            var defaultReturnDate = borrowRecord.DefaultReturnDate;
            var penaltyPercentage = (float)(((decimal)(borrowRecord.BookStore.Book.PenalityPercentage / 100.0)) * borrowRecord.BookStore.Book.BookPrice);
            var penaltyDays = CalculateOverDays(defaultReturnDate);
            var penaltyValue = CalculatePenalty((float)penaltyPercentage, penaltyDays);
            return (penaltyDays, penaltyValue);
        }

      
        public async Task<Penalitie?> GetOrCreatePenaltyRecordAsync(int borrowId, (int PenaltyDays, float PenaltyValue) penaltyDetails)
        {
            return await _penaltyRepository.GetOrCreatePenaltyRecordAsync(borrowId, penaltyDetails.PenaltyDays, penaltyDetails.PenaltyValue);
        }

        
        public PenaltyVM CreatePenaltyViewModel(Penalitie penaltyRecord)
        {
            return new PenaltyVM
            {
                Id = penaltyRecord.Id,
                BorrowId = penaltyRecord.BorrowId,
                BookTitle = penaltyRecord.Borrow.BookStore.Book.Title,
                BorrowDate = penaltyRecord.Borrow.BorrowDate,
                DefaultReturnDate = penaltyRecord.Borrow.DefaultReturnDate,
                PenaltyDays = penaltyRecord.PenaliteDays,
                PValue = penaltyRecord.PValue,
                IsPaid = penaltyRecord.IsPaid,

                MemberDetails = new MemberDetailsVM
                {
                    Id = penaltyRecord.Borrow.Member.Id,
                    MemberNo = penaltyRecord.Borrow.Member.MemberNo,
                    Name = penaltyRecord.Borrow.Member.ApplicationUser.Name,
                    Email = penaltyRecord.Borrow.Member.ApplicationUser.Email,
                    Phone = penaltyRecord.Borrow.Member.ApplicationUser.PhoneNumber
                }
            };
        }

       
        public int CalculateOverDays(DateTime defaultReturnDate)
        {
            return (DateTime.Now - defaultReturnDate).Days;
        }

      
        public float CalculatePenalty(float penaltyPercentage, int penaltyDays)
        {
            return penaltyPercentage * penaltyDays;
        }

        public async Task<(bool Success, string Message)> MarkPenaltyAsPaidAsync(int penaltyId, int librarianId)
        {
            // Retrieve the penalty record
            var penalty = await _penaltyRepository.GetPenaltyByIdAsync(penaltyId);

            if (penalty == null)
            {
                return (false, "Penalty record not found.");
            }

            if (penalty.IsPaid)
            {
                return (false, "This penalty has already been marked as paid.");
            }

            var borrowId = penalty.BorrowId;

            try
            {
                // Mark as paid
                penalty.IsPaid = true;

                // Save the penalty update
                await _penaltyRepository.UpdatePenaltyAsync(penalty);

                // Call the method to update return date
                bool isSuccess = await _returnBookService.UpdateReturnDateAsync(borrowId, librarianId);

                return isSuccess ? (true, "Penalty marked as paid and return date updated.") : (false, "Penalty marked as paid but failed to update return date.");
            }
            catch (Exception ex)
            {
                return (false, $"An error occurred: {ex.Message}");
            }
        }
    }

}
