using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.Book;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Application.Repository.Repository
{
    public class BookRepository
    {
        private readonly AppDBContext _context;

        public BookRepository(AppDBContext Context)
        {
            _context = Context;
        }

        public async Task<Book> GetBookALLInfoByID(int id)
        {
           var book = await _context.Books
            .Include(b => b.Authors) // Include related author
            .Include(b => b.Genre)  // Include related genre
            .Include(b => b.BookStore)
            .SingleOrDefaultAsync(b => b.Id == id);

            
            return book;
        }
    }
}
