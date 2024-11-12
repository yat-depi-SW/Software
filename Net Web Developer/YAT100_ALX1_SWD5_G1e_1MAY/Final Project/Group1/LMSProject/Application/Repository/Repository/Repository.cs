using LMSProject.Application.Repository.Interface;
using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace LMSProject.Application.Repository.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly AppDBContext _dbContext;
        public Repository(AppDBContext dbContext)
        {
            _dbContext = dbContext;

        }
        public async Task AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);

        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _dbContext.Set<T>().FindAsync(id);
            if (entity != null)
            {
                _dbContext.Set<T>().Remove(entity);
            }
        }

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbContext.Set<T>().Where(predicate).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();

        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public Task UpdateAsync(T entity)
        {
            _dbContext.Set<T>().Update(entity);
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<T>> GetAllWithIncludesAsync(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbContext.Set<T>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync();
        }

        // Method to get Librarian by Application User ID
        public async Task<T?> GetLibrarianByApplicationUserIdAsync(string applicationUserId)
        {
            // Assumes that 'T' has an 'ApplicationUserId' property
            return await _dbContext.Set<T>().FirstOrDefaultAsync(e => EF.Property<string>(e, "ApplicationUserId") == applicationUserId);
        }
    }
}
