using LMSProject.Application.Services;
using LMSProject.Application.ViewModel.Genre;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMSProject.Controllers
{
    [Authorize(Roles = "Admin")]
    public class GenreController : Controller
    {
        private readonly GenreService _service;

        public GenreController(GenreService genreService)
        {
            _service = genreService;
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
        public async Task<IActionResult> Add(AddGenreVM objVM)
        {
            if (ModelState.IsValid)
            {
                var existingGenre = await _service.GetGenreByNameAsync(objVM.Name);
                if (existingGenre != null)
                {
                    ModelState.AddModelError("Name", "A genre with this name already exists.");
                    return View("Add", objVM);
                }
                await _service.AddGenreAsync(objVM);
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
        public async Task<IActionResult> Edit(GenreVM objVM)
        {
            if (ModelState.IsValid)
            {
                var success = await _service.EditGenreAsync(objVM);
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
                var result = await _service.DeleteGenreAsync(id);
                if (!result)
                {
                    TempData["ErrorMessage"] = "This genre cannot be deleted as it is in used by one or more books.";
                    return RedirectToAction("Index");
                }

                return RedirectToAction("Index");
            }
            catch (DbUpdateException ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error deleting genre with ID {Id}", id);

                // Display a user-friendly message
                TempData["ErrorMessage"] = "This genre cannot be deleted as it is in used by one or more books.";
                return RedirectToAction("Index");
            }
        }
    }
}
