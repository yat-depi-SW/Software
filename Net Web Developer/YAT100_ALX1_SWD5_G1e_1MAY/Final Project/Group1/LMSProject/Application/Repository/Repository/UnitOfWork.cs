using LMSProject.Application.Repository.Interface;
using LMSProject.Data.Models.Models;
using LMSProject.Data.Models;
using LMSProjectAUTH.Application.Repository.Interface;
using LMSProjectAUTH.Application.Repository.Repository;

namespace LMSProject.Application.Repository.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDBContext _dbContext;
        private Repository<Author>? _author;
        private Repository<Genre>? _genre;
        private Repository<Book>? _book;
        private Repository<Member>? _member;
        private Repository<Librarian>? _librarian;
        private Repository<BookStore>? _bookStore;
        private Repository<Borrow>? _borrow;
        private Repository<Penalitie>? _penalitie;
        private IReturnRepository _returnRepository;
        private Repository<BookSearchRepository> _bookSearchRepository;
        public Repository<BookRepository> _bookRepository { get; set; }

        private IPenaltyRepository _penaltyRepository;

        public IPenaltyRepository PenaltyRepository
        {
            get
            {
                _penaltyRepository ??= (IPenaltyRepository)new PenaltyRepository(_dbContext);
                return _penaltyRepository;
            }
        }
        public IReturnRepository ReturnRepository => _returnRepository ??= new ReturnRepository(_dbContext);

        public IRepository<BookRepository> BookRepository
        {
            get
            {
                return _bookRepository ??= new Repository<BookRepository>(_dbContext);
            }
        }
        public IRepository<Author> Author
        {
            get
            {
                return _author ??= new Repository<Author>(_dbContext);
            }
        }
        public UnitOfWork(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IRepository<BookSearchRepository> BookSearch
        {
            get
            {
                return _bookSearchRepository ??= new Repository<BookSearchRepository>(_dbContext);
            }
        }
        public IRepository<Book> Book
        {
            get
            {
                return _book ??= new Repository<Book>(_dbContext);
            }
        }

        public IRepository<Borrow> Borrow
        {
            get
            {
                return _borrow ??= new Repository<Borrow>(_dbContext);
            }
        }
        public IRepository<BookStore> BookStore
        {
            get
            {
                return _bookStore ??= new Repository<BookStore>(_dbContext);
            }
        }
        public IRepository<Genre> Genre
        {
            get
            {
                return _genre ??= new Repository<Genre>(_dbContext);
            }
        }

        public IRepository<Member> Member
        {
            get
            {
                return _member ??= new Repository<Member>(_dbContext);
            }
        }
        public IRepository<Librarian> Librarian
        {
            get
            {
                return _librarian ??= new Repository<Librarian>(_dbContext);
            }
        }

        public IRepository<Penalitie> Penalitie => throw new NotImplementedException();

        public IRepository<BookSearchRepository> BookSearchRepository => throw new NotImplementedException();

        //public IRepository<Penalitie> Penalitie
        //{
        //    get
        //    {
        //        return _penalitie ??= new Repository<Penalitie>(_dbContext);
        //    }
        //}


        

        public IRepository<TEntity> Repository<TEntity>() where TEntity : class
        {
            return new Repository<TEntity>(_dbContext); // Create and return the repository for the specified type
        }

        public async Task<int> SaveAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}
