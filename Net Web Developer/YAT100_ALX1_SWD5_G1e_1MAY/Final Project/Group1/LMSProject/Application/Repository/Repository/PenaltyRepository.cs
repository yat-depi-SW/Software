using LMSProject.Data.Models.Models;
using LMSProject.Data.Models;
using Microsoft.EntityFrameworkCore;
using LMSProjectAUTH.Application.Repository.Interface;
using AutoMapper;
using LMSProject.Application.Repository.Interface;
using LMSProject.Application.Repository.Repository;
using LMSProjectAUTH.Application.ViewModel.Member;
using LMSProjectAUTH.Application.ViewModel.Penalty;
using Microsoft.AspNetCore.Mvc;

namespace LMSProjectAUTH.Application.Repository.Repository
{
    public class PenaltyRepository : IPenaltyRepository
    {
        private readonly AppDBContext _dbContext;

        public PenaltyRepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Borrow?> GetBorrowRecordAsync(int borrowId)
        {
            return await _dbContext.Borrows
                .Include(b => b.BookStore)
                    .ThenInclude(bs => bs.Book)
                .Include(b => b.Member)
                    .ThenInclude(m => m.ApplicationUser)
                .FirstOrDefaultAsync(b => b.Id == borrowId);
        }


        public async Task<Penalitie?> GetOrCreatePenaltyRecordAsync(int borrowId, int penaltyDays, float penaltyValue)
        {
            var penaltyRecord = await _dbContext.penalities.FirstOrDefaultAsync(p => p.BorrowId == borrowId);

            if (penaltyRecord == null)
            {
                penaltyRecord = new Penalitie
                {
                    BorrowId = borrowId,
                    PenaliteDays = penaltyDays,
                    PValue = penaltyValue,
                    IsPaid = false
                };

                await _dbContext.penalities.AddAsync(penaltyRecord);
            }
            else
            {
                penaltyRecord.PenaliteDays = penaltyDays;
                penaltyRecord.PValue = penaltyValue;
            }

            await _dbContext.SaveChangesAsync();

            return await _dbContext.penalities
                .Include(p => p.Borrow)
                    .ThenInclude(b => b.BookStore)
                        .ThenInclude(bs => bs.Book)
                .Include(p => p.Borrow)
                    .ThenInclude(b => b.Member)
                        .ThenInclude(m => m.ApplicationUser)
                .FirstOrDefaultAsync(p => p.BorrowId == borrowId);
        }

        public async Task<Penalitie?> GetPenaltyByIdAsync(int penaltyId)
        {
            return await _dbContext.penalities
                .Include(p => p.Borrow)
                .FirstOrDefaultAsync(p => p.Id == penaltyId);
        }

        // Update penalty record and save to database
        public async Task UpdatePenaltyAsync(Penalitie penalty)
        {
            _dbContext.penalities.Update(penalty);
            await _dbContext.SaveChangesAsync();
        }
    }
}
