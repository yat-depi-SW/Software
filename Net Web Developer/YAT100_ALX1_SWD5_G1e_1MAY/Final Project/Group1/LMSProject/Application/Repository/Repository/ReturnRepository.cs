using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.Repository.Interface;
using LMSProjectAUTH.Application.ViewModel.Borrow;
using LMSProjectAUTH.Application.ViewModel.Member;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Application.Repository.Repository
{
    public class ReturnRepository: IReturnRepository
    {
        private readonly AppDBContext _dbContext;

        public ReturnRepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Member>> GetMembersAsync()
        {
            return await _dbContext.Members.ToListAsync();
        }

        public async Task<Member> GetMemberByIdAsync(int memberId)
        {
            return await _dbContext.Members
                .Include(m => m.ApplicationUser)
                .FirstOrDefaultAsync(m => m.Id == memberId);
        }

        public async Task<IEnumerable<Borrow>> GetBorrowsByMemberIdAsync(int memberId)
        {
            return await _dbContext.Borrows
                .Include(b => b.BookStore)
                    .ThenInclude(bs => bs.Book)
                .Include(b => b.Member)
                .Where(b => b.MemberId == memberId && b.ReturnDate == null)
                .ToListAsync();
        }

        public async Task<Borrow> GetBorrowByIdAsync(int borrowId)
        {
            return await _dbContext.Borrows
                .Include(b => b.BookStore)
                .FirstOrDefaultAsync(b => b.Id == borrowId);
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
