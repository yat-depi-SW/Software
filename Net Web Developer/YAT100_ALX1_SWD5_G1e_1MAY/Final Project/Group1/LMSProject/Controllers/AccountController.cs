using LMSProject.Application.Repository.Interface;
using LMSProject.Application.ViewModel.Account;
using LMSProject.Data.Models;
using LMSProjectAUTH.Application.ViewModel.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;

namespace LMSProject.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public AccountController(IAccountService accountService,
            UserManager<ApplicationUser> userManager,
            IUserService userService, IConfiguration configuration)
        {
            _accountService = accountService;
            _userManager = userManager;
            _userService = userService;
            _configuration = configuration;
        }

        //=====================================================

        [HttpGet]
        [Authorize(Roles = "Librarian,Admin")]
        public async Task<IActionResult> Register(string userType)
        {
           

           
            var model = new UserRegistrationViewModel
            {
                UserType = userType
            };

            if (userType == "Librarian")
            {
                model.LibrarianNo = await _userService.GenerateUniqueNumberAsync("Librarian");
                model.HiredOn = DateOnly.FromDateTime(DateTime.Now);
            }
            else if (userType == "Member")
            {
                model.MemberNo = await _userService.GenerateUniqueNumberAsync("Member");
                model.SubscribeDate = DateOnly.FromDateTime(DateTime.Now);
            }

            return View(model);
        }

        [HttpPost]
        [Authorize(Roles = "Librarian,Admin")]
        public async Task<IActionResult> Register(UserRegistrationViewModel model)
        {
            if (ModelState.IsValid)
            {
                IdentityResult result = null;

                if (model.UserType == "Librarian")
                {
                    //Only Admins can register Librarians
                    if (!User.IsInRole("Admin"))
                    {
                        return Forbid();
                    }
                    result = await _accountService.RegisterLibrarianAsync(
                        new LibrarianViewModel
                        {
                            UserName = model.UserName,
                            Name = model.Name,
                            Email = model.Email,
                            NID = model.NID,
                            Address = model.Address,
                            Phone = model.Phone,
                            LibrarianNo = model.LibrarianNo,
                            HiredOn = model.HiredOn.GetValueOrDefault()
                        },
                        model.Password);
                }
                else if (model.UserType == "Member")
                {
                    // Only Librarians can register Members
                    if (!User.IsInRole("Librarian"))
                    {
                        return Forbid();
                    }

                    result = await _accountService.RegisterMemberAsync(
                        new MemberViewModel
                        {
                            UserName = model.UserName,
                            Name = model.Name,
                            Email = model.Email,
                            NID = model.NID,
                            Address = model.Address,
                            Phone = model.Phone,
                            MemberNo = model.MemberNo,
                            SubscribeDate = model.SubscribeDate.GetValueOrDefault()
                        },
                        model.Password);
                }

                if (result != null && result.Succeeded)
                {
                    if (User.IsInRole("Admin"))
                    {
                        return RedirectToAction("Index", "AdminDb");
                    }
                    else if (User.IsInRole("Librarian"))
                    {
                        return RedirectToAction( "Index", "LibrarianDB");
                    }
                  
                   
                }
                else
                {
                    // If user creation failed, display errors
                    foreach (var error in result.Errors)
                    {
                        if (error.Code == "DuplicateNID")
                        {
                            ModelState.AddModelError("NID", error.Description); // Show the NID validation error
                        }
                        else
                        {
                            ModelState.AddModelError("", error.Description); // Other errors
                        }
                    }
                }
            }

            return View(model); // Redisplay the form with validation messages
        }










        //====================================================
        [HttpGet]
        [Authorize(Roles = "Librarian")]
        public async Task<IActionResult> LibrarianDashboard()
        {
            var user = await _userManager.GetUserAsync(User);
            ViewBag.UserName = user?.Name;

            return View();
        }

        [HttpGet]
        [Authorize(Roles = "Member")]
        public async Task< IActionResult> MemberDashBoard()
        {
            var user = await _userManager.GetUserAsync(User);
            ViewBag.UserName = user?.Name;
            return View();
        }
   
        
        //[HttpGet]
        //[Authorize(Roles = "Admin")]
        //public async Task<IActionResult> AdminDashboard()
        //{
        //    var user = await _userManager.GetUserAsync(User);
        //    ViewBag.UserName = user?.Name;
        //    return View();
        //}

        [HttpGet]
        public IActionResult RegisterAdmin()
        {
            return View();
        }

        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }
        // /////////////////////////////////////////////////////

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RegisterAdmin(AdminRegisterationViewModel model)
        {
            // Check if any users exist already (disable registration if users exist)
            var usersExist = await _userManager.Users.AnyAsync();
            if (usersExist)
            {
                return RedirectToAction("Login", "Account");
            }

            // Check setup key from configuration
            var setupKey = _configuration["SetupKey"];
            if (string.IsNullOrEmpty(setupKey) || model.SetupKey != setupKey)
            {
                ModelState.AddModelError("", "Invalid setup key.");
                return View(model);
            }

            if (ModelState.IsValid)
            {
                var result = await _accountService.RegisterAdminAsync(model, model.Password);
                if (result.Succeeded)
                {
                    return RedirectToAction("Login", "Account");
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }


            return View(model);

        }


        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken] 
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // Call the login method from the AccountService
            var (succeeded, role, errorMessage) = await _accountService.LoginAsync(model);

            if (succeeded)
            {
                // Redirect based on the role
                if (role == "Admin")
                {
                    return RedirectToAction("Index", "AdminDB");
                }
                else if (role == "Librarian")
                {
                    return RedirectToAction("Index", "LibrarianDB");
                }
                else if (role == "Member")
                {
                    return RedirectToAction("Index", "MemberDB");
                }
                else
                {
                    // If no role matched, default to home
                    return RedirectToAction("Login", "Account");
                }
            }

            // If login fails, add an error
            //ModelState.AddModelError(string.Empty, errorMessage);
            ModelState.AddModelError(string.Empty, "Wrong username or password.");

            return View(model);
        }



        [HttpPost]
        [ValidateAntiForgeryToken]  // Protect from CSRF attacks
        public async Task<IActionResult> SignOut()
        {
            await _accountService.LogoutAsync();
            return RedirectToAction("Login", "Account");  // Redirect to the login page after sign out
        }

      






    }
}
