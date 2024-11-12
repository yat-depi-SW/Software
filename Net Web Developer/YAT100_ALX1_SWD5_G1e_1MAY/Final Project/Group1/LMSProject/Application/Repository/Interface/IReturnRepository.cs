using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.Borrow;
using LMSProjectAUTH.Application.ViewModel.Member;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace LMSProjectAUTH.Application.Repository.Interface
{
    public interface IReturnRepository
    {
        Task<IEnumerable<Member>> GetMembersAsync();
        Task<Member> GetMemberByIdAsync(int memberId);
        Task<IEnumerable<Borrow>> GetBorrowsByMemberIdAsync(int memberId);
        Task<Borrow> GetBorrowByIdAsync(int borrowId);
        Task SaveAsync();
    }
}
