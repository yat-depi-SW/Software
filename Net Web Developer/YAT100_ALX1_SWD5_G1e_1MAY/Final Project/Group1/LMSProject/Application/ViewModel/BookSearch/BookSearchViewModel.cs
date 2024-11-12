using LMSProject.Data.Models.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace LMSProjectAUTH.Application.ViewModel.BookSearch
{
    public class BookSearchViewModel
    {
        // Search Criteria
        public string Title { get; set; }
        public int? AuthorId { get; set; }
        public int? GenreId { get; set; }

        // Dropdown Lists
        public IEnumerable<SelectListItem> Authors { get; set; }
        public IEnumerable<SelectListItem> Genres { get; set; }

        // Search Results
        public IEnumerable<BookSearchResultViewModel> Books { get; set; }

    }
}
