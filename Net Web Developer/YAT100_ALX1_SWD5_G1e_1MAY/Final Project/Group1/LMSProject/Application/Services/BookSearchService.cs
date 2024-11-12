using LMSProject.Application.Repository.Interface;
using LMSProject.Application.Repository.Repository;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.Repository.Repository;
using LMSProjectAUTH.Application.ViewModel.BookSearch;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Application.Services
{
    public class BookSearchService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly BookSearchRepository _bookSearchRepository;

        public BookSearchService(IUnitOfWork unitOfWork,BookSearchRepository bookSearchRepository)
        {
            _unitOfWork = unitOfWork;
            _bookSearchRepository = bookSearchRepository;
        }

        //  Austhor List as SelectListItems 
        public async Task<List<SelectListItem>> GetAuthorsDropdownAsync()
        {
            var authorsdb = await _unitOfWork.Author.GetAllAsync();
            var authorslst= authorsdb.OrderBy(a => a.Name).Select(m => new SelectListItem
                {
                    Value = m.Id.ToString(),
                    Text = m.Name
                })
                .ToList();
             //authorslst.Insert(0, new SelectListItem { Value = "0", Text = "All Authors" });
            return authorslst;
        }

        //  Genres List as SelectListItems 
        public async Task<List<SelectListItem>> GetGenreListAsync()
        {
            var genredb = await _unitOfWork.Genre.GetAllAsync();
            var genrelst = genredb.OrderBy(a => a.Name).Select(m => new SelectListItem
            {
                Value = m.Id.ToString(),
                Text = m.Name
            })
                .ToList();
            //genrelst.Insert(0, new SelectListItem { Value = "0", Text = "All Genres" });
            return genrelst;
        }

        //Search Query

        public async Task<IEnumerable<BookSearchResultViewModel>> GetSearchBooksAsync(string title, int? authorId, int? genreId)
        {
            return await _bookSearchRepository.GetBooksSearchResultAsync(title, authorId, genreId);
        }

    }
}
