using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.Repository.Interface;
using LMSProjectAUTH.Application.Repository.Repository;

namespace LMSProject.Application.Repository.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Author> Author { get; }
        IRepository<Book> Book { get; }
        IRepository<Genre> Genre { get; }
        IRepository<Member> Member { get; }
        IRepository<Librarian> Librarian { get; }

        IRepository<Borrow> Borrow { get; } 
        IRepository<Penalitie> Penalitie { get; }
        IReturnRepository ReturnRepository { get; }
        IPenaltyRepository PenaltyRepository { get; }

        IRepository<BookStore> BookStore { get; }

        IRepository<BookRepository> BookRepository { get; }
        IRepository<BookSearchRepository> BookSearchRepository { get; }
        IRepository<TEntity> Repository<TEntity>() where TEntity : class; // Generic method to get a repository
       
                
        Task<int> SaveAsync();
    }
}
