using LMSProject.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using LMSProject.Data.Models.Models;
using Microsoft.EntityFrameworkCore;
using LMSProjectAUTH.Application.Services;
using LMSProject.Application.Repository.Interface;
using LMSProjectAUTH.Application.Repository.Repository;
using LMSProjectAUTH.Application.ViewModel.BookSearch;
using LMSProjectAUTH.Application.ViewModel.Book;
using LMSProject.Application.ViewModel.Genre;
using LMSProjectAUTH.Application.ViewModel.BorrowHistory;
using LMSProject.Application.ViewModel.Author;
using AutoMapper;
using LMSProject.Application.Repository.Repository;
using System.Net;
using Microsoft.AspNetCore.Authorization;
namespace LMSProjectAUTH.Controllers
{
    [Authorize(Roles = "Admin")]
    public class BooksController : Controller
    {
        private readonly AppDBContext _context;
        private readonly BookSearchService _bookSearchService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly BookService _bookService;
        private readonly IMapper _mapper;

        public BooksController(AppDBContext context,
            BookSearchService bookSearchService,IUnitOfWork unitOfWork
            ,BookService bookService,IMapper mapper)
        {
            _context = context;
            _bookSearchService = bookSearchService;
            _unitOfWork = unitOfWork;
            _bookService = bookService;
            _mapper = mapper;
        }

        public IActionResult Index()
        {
            var books = _context.Books
            .Include(b => b.Authors) // Include related author
            .Include(b => b.Genre)  // Include related genre
            .ToList(); // All books from DB
            return View(books);
        }


       
        [HttpGet]
      public async Task< IActionResult> Add()
        {
            var model = new addBookVM
            {
                Authors =await _bookSearchService.GetAuthorsDropdownAsync(),
                Genres=await _bookSearchService.GetGenreListAsync()
            };
           
            return View(model);
        }

       

        [HttpPost]
        public async Task<IActionResult> Add(addBookVM addBookVM)
        {
            if (await IsTitleExists(addBookVM.Title))
            {
                ModelState.AddModelError("Title", "The book title already exists.");
            }

            // Check if AuthorId and GenreID exist in the database
            var authorExists = await _context.Authors.AnyAsync(a => a.Id == addBookVM.AuthorId);
            var genreExists = await _context.Genres.AnyAsync(g => g.Id == addBookVM.GenreID);

            if (!authorExists)
            {
                ModelState.AddModelError("AuthorId", "Author is Required.");
            }
            if (!genreExists)
            {
                ModelState.AddModelError("GenreID", "Genre is Required.");
            }

            if (!ModelState.IsValid)
            {
                addBookVM.Authors = await _bookSearchService.GetAuthorsDropdownAsync();
                addBookVM.Genres = await _bookSearchService.GetGenreListAsync();
                return View(addBookVM);
            }

            // Process the file upload if necessary
            byte[] bookPhotoBytes = null;
            if (addBookVM.UploadBookPhoto != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await addBookVM.UploadBookPhoto.CopyToAsync(memoryStream);
                    bookPhotoBytes = memoryStream.ToArray();
                    addBookVM.BookPhoto = bookPhotoBytes;
                }
            }

            // Add the book to the database
            await _bookService.AddBookAsync(addBookVM);
            return RedirectToAction(nameof(Index));
        }


        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task <IActionResult> Details(int id)
        {

            var bookvm = await _bookService.GetBookDetailsAsyn(id);
            if(bookvm == null)
            {
                return NotFound();
            }
            ViewBag.UnBorrowedBooks = _context.BookStores.Where(b => b.BookId == id && b.IsAvaliable).Count();
            ViewBag.BorrowedBooks = _context.BookStores.Where(b => b.BookId == id && !b.IsAvaliable).Count();

            return View(bookvm);
        }



        // Method to check if the title exists for another book
        private async Task<bool> IsTitleExistsForAnotherBook(string title, int bookId)
        {
            return await _context.Books.AnyAsync(b => b.Title == title && b.Id != bookId);
        }

        
        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var book = await _bookService.GetByIdAsync(id);
          

            if (book == null)
            {
                return NotFound();
            }

            var model = new EditBookVM
            {
                Id = book.Id,
                Title = book.Title,
                BookPrice = book.BookPrice,
                PenalityPercentage = book.PenalityPercentage,
                GenreID = book.GenreID,
                AuthorId = book.AuthorId,
                BookPhoto = book.BookPhoto,
                Authors = await _bookSearchService.GetAuthorsDropdownAsync(),
                Genres = await _bookSearchService.GetGenreListAsync(),
                NoofCopies= _context.BookStores.Where(b => b.BookId == id).Count()
            };

           


            return View(model);
        }

        
        [HttpPost]
        public async Task<IActionResult> Edit(EditBookVM model, int id)
        {

            // Check for unique title excluding the current book
            if (await IsTitleExistsForAnotherBook(model.Title, model.Id))
            {
                ModelState.AddModelError("Title", "The book title already exists.");
            }
            if (!ModelState.IsValid)
            {
                // Repopulate dropdown lists
                model.Authors = await _bookSearchService.GetAuthorsDropdownAsync();
                model.Genres = await _bookSearchService.GetGenreListAsync();
                return View(model);
            }

            var objdb = await _bookService.GetByIdAsync(model.Id);

            // Current count of available copies in the bookstore
            var avaliableCopies = _context.BookStores .Where(b => b.BookId == id && b.IsAvaliable) .Count();
            var noofAllCopies= _context.BookStores.Where(b => b.BookId == id ).Count();
            // Handle the change in NoofCopies
            
            if (model.NoofCopies > noofAllCopies)
            {
                // Increase the number of copies
                int copiesToAdd = model.NoofCopies - noofAllCopies;
                for (int i = 0; i < copiesToAdd; i++)
                {
                    var newBookStore = new BookStore
                    {
                        BookId = id,
                        IsAvaliable = true
                    };
                    _context.BookStores.Add(newBookStore);
                }
                await _context.SaveChangesAsync();
            }
            else if (model.NoofCopies < noofAllCopies)
            {
                var copiesToRemove = noofAllCopies - model.NoofCopies;
                if (copiesToRemove < avaliableCopies)
                {
                    var availableBooks = _context.BookStores
                    .Where(b => b.BookId == id && b.IsAvaliable)
                    .Take(copiesToRemove)
                    .ToList();

                    _context.BookStores.RemoveRange(availableBooks);
                    await _context.SaveChangesAsync();

                }             
                else
                {
                    // Not enough available copies to remove, display error message
                    ModelState.AddModelError("NoofCopies", "There are not enough available copies to remove. Some books are currently in use and cannot be deleted.");
                    model.Authors = await _bookSearchService.GetAuthorsDropdownAsync();
                    model.Genres = await _bookSearchService.GetGenreListAsync();
                    return View(model);
                }
            }
            objdb.Id =model.Id;
            objdb.Title = model.Title;
            objdb.BookPrice = model.BookPrice;
            objdb.PenalityPercentage = model.PenalityPercentage;
            objdb.GenreID = model.GenreID;
            objdb.AuthorId = model.AuthorId;

            // Handle the file upload (new photo)
            if (model.UploadBookPhoto != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await model.UploadBookPhoto.CopyToAsync(memoryStream);
                    var bookphoto = memoryStream.ToArray(); // Update the book photo with the new file
                    objdb.BookPhoto = bookphoto;
                }
            }



            await _unitOfWork.SaveAsync();
           

            return RedirectToAction(nameof(Index));
           
        }





       
        public IActionResult Delete(int id)
        {
            var book = _context.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }
            return View(book);
        }

        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            try
            {
                var book = _context.Books
                                   .Include(b => b.BookStore) // Include related entities if needed
                                   .FirstOrDefault(b => b.Id == id);

                if (book == null)
                {
                    return NotFound();
                }

                // Check if the book is referenced in the BookStore table
                if (book.BookStore.Any())
                {
                    TempData["ErrorMessage"] = "This book cannot be deleted as it is in used.";
                    return RedirectToAction(nameof(Index));
                }

                _context.Books.Remove(book);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            catch (DbUpdateException ex)
            {
                // Log the error (optional)
                // _logger.LogError(ex, "Error deleting book with ID {Id}", id);

                // Display a user-friendly message
                TempData["ErrorMessage"] = "This book cannot be deleted as it is in used.";
                return RedirectToAction(nameof(Index));
            }
        }

        private async Task<bool> IsTitleExists(string title)
        {
            return await _context.Books.AnyAsync(b => b.Title == title);
        }
    }
}


