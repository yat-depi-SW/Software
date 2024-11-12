using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.Services;
using LMSProjectAUTH.Application.ViewModel.BookSearch;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Controllers
{
    [Authorize(Roles = "Librarian,Admin")]
    public class BookSearchController : Controller
    {
       
        private readonly BookSearchService _bookSearchService;

        public BookSearchController(BookSearchService bookSearchService)
        {
            
            _bookSearchService = bookSearchService;
        }

        public async Task<IActionResult> Index(string title, int? authorId, int? genreId)
        {
            // Prepare the ViewModel
            var viewModel = new BookSearchViewModel
            {
                Title = title,
                AuthorId = authorId,
                GenreId = genreId,
                Authors = await _bookSearchService.GetAuthorsDropdownAsync(),
                Genres = await _bookSearchService.GetGenreListAsync(),
                Books = await _bookSearchService.GetSearchBooksAsync(title, authorId, genreId)
            };

            return View(viewModel);
        }







        
    }
}
