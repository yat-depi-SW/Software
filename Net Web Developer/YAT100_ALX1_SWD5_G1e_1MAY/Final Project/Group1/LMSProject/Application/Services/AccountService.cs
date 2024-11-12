using AutoMapper;
using LMSProject.Application.Repository.Interface;
using LMSProject.Data.Models.Models;
using LMSProject.Data.Models;
using Microsoft.AspNetCore.Identity;
using LMSProject.Application.ViewModel.Account;
using LMSProjectAUTH.Application.ViewModel.Account;
using Microsoft.EntityFrameworkCore;


namespace LMSProject.Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AccountService(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

      //Register
        public async Task<IdentityResult> RegisterLibrarianAsync(LibrarianViewModel model, string password)
        {
            var existingUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NID == model.NID);
            if (existingUser != null)
            {
                var error = new IdentityError
                {
                    Code = "DuplicateNID",
                    Description = "The National ID already exists."
                };
                return IdentityResult.Failed(error);
            }

            // Create the ApplicationUser instance first
            var user = _mapper.Map<ApplicationUser>(model);


            // Create the user with the provided password
            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                return result; // Return errors back to the controller
            }

            
                await _userManager.AddToRoleAsync(user, "Librarian");
                // Map the LibrarianViewModel to Librarian

                var librarian = _mapper.Map<Librarian>(model);

                // Set the ApplicationUserId
                librarian.ApplicationUserId = user.Id;

                // Save the librarian entity to the database
                await _unitOfWork.Librarian.AddAsync(librarian);
                await _unitOfWork.SaveAsync();
            

            return result;
        }

        //Register
        public async Task<IdentityResult> RegisterMemberAsync(MemberViewModel model, string password)
        {
            // Check if NID already exists
            var existingUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NID == model.NID);
            if (existingUser != null)
            {
                var error = new IdentityError
                {
                    Code = "DuplicateNID",
                    Description = "The National ID already exists."
                };
                return IdentityResult.Failed(error);
            }

            // Use AutoMapper to map MemberViewModel to ApplicationUser
            var user = _mapper.Map<ApplicationUser>(model);

            // Create the user with the provided password
            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                return result; // Return errors back to the controller
            }

            await _userManager.AddToRoleAsync(user, "Member");
                // Use AutoMapper to map the view model to the Member entity
                var member = _mapper.Map<Member>(model);

                // Set the ApplicationUserId manually
                member.ApplicationUserId = user.Id;

                // Save the member entity to the database (using UnitOfWork or direct context)
                await _unitOfWork.Member.AddAsync(member);
                await _unitOfWork.SaveAsync();
           

            return result;
        }

        public async Task<IdentityResult> RegisterAdminAsync(AdminRegisterationViewModel model, string password)
        {
            // Create the ApplicationUser instance first
            var user = new ApplicationUser
            {
                UserName = model.UserName,    // IdentityUser's UserName property
                Email = model.Email,          // IdentityUser's Email property
                Name = model.Name,            // Full name (custom property)
                NID = model.NID,              // National ID (custom property)
                Address = model.Address,      // Address (custom property)
                PhoneNumber = model.Phone     // IdentityUser's PhoneNumber property (optional)
            };

            // Create the user with the provided password
            var result = await _userManager.CreateAsync(user, password);

            // If the user was created successfully, create the associated Member record
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Admin");
                

              
                await _unitOfWork.SaveAsync();
            }

            return result;
        }


        public async Task<(bool Succeeded, string Role, string ErrorMessage)> LoginAsync(LoginViewModel model)
        {
            // Attempt to sign in the user using the username
            var result = await _signInManager.PasswordSignInAsync(
                model.UserName, model.Password, model.RememberMe, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                // Get the logged-in user
                var user = await _userManager.FindByNameAsync(model.UserName);

                // Determine user roles
                var roles = await _userManager.GetRolesAsync(user);

                if (roles.Contains("Admin"))
                {
                    return (true, "Admin", null);
                }
                else if (roles.Contains("Librarian"))
                {
                    return (true, "Librarian", null);
                }
                else if (roles.Contains("Member"))
                {
                    return (true, "Member", null);
                }

                return (true, "Unknown", null); // If no matching role, use a default role
            }

            // If login fails
            return (false, null, "User Name or Password is invalid.");
        }
        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
