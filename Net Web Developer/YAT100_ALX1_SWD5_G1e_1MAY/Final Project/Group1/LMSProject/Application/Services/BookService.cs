using AutoMapper;
using LMSProject.Application.Repository.Interface;
using LMSProject.Application.ViewModel.Author;
using LMSProject.Application.ViewModel.Genre;
using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.Repository.Repository;
using LMSProjectAUTH.Application.ViewModel.Book;
using Microsoft.EntityFrameworkCore;

namespace LMSProjectAUTH.Application.Services
{
    public class BookService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;
        private readonly AppDBContext _context;
        private readonly BookRepository _bookRepository;

        public BookService(IUnitOfWork unitOfWork, IMapper autoMapper,
            AppDBContext context, BookRepository bookRepository )
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
            _context = context;
            _bookRepository = bookRepository;
        }

        public async Task<IEnumerable<BookVM>> GetAllAsync()
        {
            var books = await _unitOfWork.Book.GetAllAsync();
            var booksVM = _autoMapper.Map<IEnumerable<BookVM>>(books);

            return booksVM;
        }

        public async Task<IEnumerable<BookVM>> GetAllAsync0()
        {
            var books = await _unitOfWork.Book.GetAllAsync();
            var booksVM = _autoMapper.Map<IEnumerable<BookVM>>(books);

            return booksVM;
        }

        public async Task<IEnumerable<BookVM>> GetAllWithDetailsAsync()
        {
            // Fetch books with related BookStore, Genre, and Authors
            var books = await _unitOfWork.Book.GetAllWithIncludesAsync(
                b => b.BookStore
            );

            // Use AutoMapper to map the books to the view model
            var booksVM = _autoMapper.Map<IEnumerable<BookVM>>(books);

            return booksVM;
        }

        public async Task<IEnumerable<BookfVM>> GetFAllWithDetailsAsync()
        {
            // Fetch books with related BookStore, Genre, and Authors
            var books = await _unitOfWork.Book.GetAllWithIncludesAsync(
                b => b.BookStore
            );

            // Use AutoMapper to map the books to the view model
            var booksVM = _autoMapper.Map<IEnumerable<BookfVM>>(books);

            return booksVM;
        }

        public async Task AddBookAsync(addBookVM addBookVM)
        {
            
            var bookdb = _autoMapper.Map<Book>(addBookVM);
            await _unitOfWork.Book.AddAsync(bookdb);
            await _unitOfWork.SaveAsync();

            var copiesNo = addBookVM.NoOfCopies;
            int newid = bookdb.Id;
            await AddBookCopies(copiesNo, newid);


        }

        private async Task AddBookCopies(int copiesNo, int bookid)
        {
            for (int i = 0; i < copiesNo; i++)
            {
                var bookstore = new BookStore
                {
                    BookId = bookid,
                    IsAvaliable = true
                };

                await _unitOfWork.BookStore.AddAsync(bookstore);
                await _unitOfWork.SaveAsync();

            }

        }



        public async Task<BookDetialsVM>GetBookDetailsAsyn(int id)
        {
            var book = await _bookRepository.GetBookALLInfoByID(id);

            if (book == null)
            {
                return null;
            }
          
            var bookvm = new BookDetialsVM
            {
                Id = book.Id,
                Title = book.Title,
                AuthorName = book.Authors.Name,
                GenreType = book.Genre.Name,
                BookPrice = book.BookPrice,
                PenalityPercentage = book.PenalityPercentage,
                BookPhoto = book.BookPhoto,
                NoOfCopies = book.BookStore.Count()
            };

            return bookvm;
        }


        public async Task<EditBookVM> GetBookEditAsyn(int id)
        {
            var book = await _bookRepository.GetBookALLInfoByID(id);

            if (book == null)
            {
                return null;
            }

            var bookvm = new EditBookVM
            {
                Id = book.Id,
                Title = book.Title,
                GenreID = book.GenreID,
                AuthorId = book.AuthorId,
                BookPrice = book.BookPrice,
                PenalityPercentage = book.PenalityPercentage,
                BookPhoto = book.BookPhoto

            };

            return bookvm;
        }

        public async Task<Book> GetByIdAsync(int id)
        {
            if (id == 0)
                return null;

            var bookDb = await _unitOfWork.Book.GetByIdAsync(id);

            if (bookDb == null)
                return null;

          //  var bookVM = _autoMapper.Map<EditBookVM>(bookDb);

            return bookDb;
        }
    }
}
