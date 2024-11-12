using LMSProject.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace LMSProject.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            if (User.IsInRole("Admin") == true)
            {
                // Redirect authenticated users to Admin Dashboard
                return RedirectToAction("Index", "AdminDB");
            }
            else if (User.IsInRole("Librarian") == true)
            {
                return RedirectToAction("Index", "LibrarianDB");
            }
            else if (User.IsInRole("Member") == true)
            {
                return RedirectToAction("Index", "MemberDB");
            }
            //else { 

            //}
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
