using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.BookSearch;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Application.Repository.Repository
{
    public class BookSearchRepository
    {
        private readonly AppDBContext _dbContext;

        public BookSearchRepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<BookSearchResultViewModel>> GetBooksSearchResultAsync(string title, int? authorId, int? genreId)
        {
            // Start with the base query
            IQueryable<Book> booksQuery = _dbContext.Books
            .Include(b => b.Authors)
            .Include(b => b.Genre)
            .Include(b => b.BookStore)
            .ThenInclude(bb=>bb.Book)
            .AsNoTracking();

            // Apply Title filter if provided
            if (!string.IsNullOrWhiteSpace(title))
            {
                booksQuery = booksQuery.Where(b => b.Title.Contains(title));
            }

            // Apply Author filter if provided
            if (authorId.HasValue)
            {
                booksQuery = booksQuery.Where(b => b.AuthorId == authorId.Value);
            }

            // Apply Genre filter if provided
            if (genreId.HasValue)
            {
                booksQuery = booksQuery.Where(b => b.GenreID == genreId.Value);
            }

            // Project to ViewModel with Availability logic
            var result = booksQuery.Select(b => new BookSearchResultViewModel
            {
                Title = b.Title,
                Author = b.Authors.Name,
                Genre = b.Genre.Name,
                Availability = b.BookStore.Any(bs => bs.IsAvaliable) ? "Available" : "Not Available",
                PrintSerial = b.BookStore
                    .Where(bs => bs.IsAvaliable)
                    .Select(bs => (int?)bs.PrintSerial)
                    .FirstOrDefault() 
            });

            // Execute the query and return the results
            return await result.ToListAsync();
        }

    }
}
