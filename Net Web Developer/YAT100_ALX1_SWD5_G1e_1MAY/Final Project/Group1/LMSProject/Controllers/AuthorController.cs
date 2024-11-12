using LMSProject.Application.Services;
using LMSProject.Application.ViewModel.Author;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMSProject.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AuthorController : Controller
    {
        private readonly AuthorService _service;

        public AuthorController(AuthorService authorService)
        {
            _service = authorService;

        }
        public async Task<IActionResult> Index()
        {
            var lstObjdb = await _service.GetAllAsync();

            return View(lstObjdb);
        }

        [HttpGet]
        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddAuthorVM objVM)
        {
            if (ModelState.IsValid)
            {
                var existingAuthor = await _service.GetAuthorByNameAsync(objVM.Name);
                if (existingAuthor != null)
                {
                    ModelState.AddModelError("Name", "An author with this name already exists.");
                    return View("Add", objVM);
                }
                await _service.AddAuthorAsync(objVM);
                return RedirectToAction(nameof(Index));
            }

            return View("Add", objVM);

        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var objdb = await _service.GetByIdAsync(id);

            if (objdb == null)
            {
                return NotFound();
            }

            return View(objdb);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(AuthorVM objVM)
        {
            if (ModelState.IsValid)
            {
                var success = await _service.EditAuthorAsync(objVM);
                if (success)
                {
                    return RedirectToAction(nameof(Index));
                }

                return NotFound();
            }

            return View(objVM);
        }

        public async Task<IActionResult> Delete(int id)
        {
            if (id == 0)
                return NotFound();

            try
            {
                var result = await _service.DeleteAuthorAsync(id);
                if (!result)
                {
                    ModelState.AddModelError("", "This author cannot be deleted as it is in used by one or more books.");
                    return RedirectToAction("Index");
                }

                return RedirectToAction("Index");
            }
            catch (DbUpdateException ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error deleting author with ID {Id}", id);

                // Display a user-friendly message
                TempData["ErrorMessage"] = "This author cannot be deleted as it is in used by one or more books.";
                return RedirectToAction("Index");
            }
        }
    }
}
