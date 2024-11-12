using LMSProject.Application.ViewModel.Account;
using LMSProjectAUTH.Application.ViewModel.Account;
using Microsoft.AspNetCore.Identity;

namespace LMSProject.Application.Repository.Interface
{
    public interface IAccountService
    {
        Task<(bool Succeeded, string Role, string ErrorMessage)> LoginAsync(LoginViewModel model);
        Task LogoutAsync();
        Task<IdentityResult> RegisterLibrarianAsync(LibrarianViewModel model, string password);
        Task<IdentityResult> RegisterMemberAsync(MemberViewModel model, string password);
        Task<IdentityResult> RegisterAdminAsync(AdminRegisterationViewModel model, string password);
    }
}
