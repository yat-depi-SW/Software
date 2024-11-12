using AutoMapper;
using LMSProject.Application.Repository.Interface;
using LMSProject.Application.ViewModel.Author;
using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace LMSProject.Application.Services
{
    public class AuthorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;
        private readonly AppDBContext _context;

        public AuthorService(IUnitOfWork unitOfWork, IMapper autoMapper,AppDBContext context)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
            _context = context;
        }

        public async Task<Author> GetAuthorByNameAsync(string name)
        {
            return await _context.Authors.FirstOrDefaultAsync(a => a.Name.ToLower() == name.ToLower());
        }
        public async Task AddAuthorAsync(AddAuthorVM addAuthorVM)
        {
            var author = _autoMapper.Map<Author>(addAuthorVM);
            await _unitOfWork.Author.AddAsync(author);
            await _unitOfWork.SaveAsync();
        }

        public async Task<bool> EditAuthorAsync(AuthorVM authorVM)
        {
            var authorDb = await _unitOfWork.Author.GetByIdAsync(authorVM.Id);

            if (authorDb == null)
                return false;

            _autoMapper.Map(authorVM, authorDb);


            await _unitOfWork.Author.UpdateAsync(authorDb);

            await _unitOfWork.SaveAsync();

            return true;

        }


        public async Task<IEnumerable> GetAllAsync()
        {

            var author = await _unitOfWork.Author.GetAllAsync();

            var authorVM = _autoMapper.Map<IEnumerable<AuthorVM>>(author);

            return authorVM;
        }

        public async Task<AuthorVM> GetByIdAsync(int id)
        {
            if (id == 0)
                return null;

            var authorDb = await _unitOfWork.Author.GetByIdAsync(id);

            if (authorDb == null)
                return null;

            var authorVM = _autoMapper.Map<AuthorVM>(authorDb);

            return authorVM;
        }

        public async Task<bool> DeleteAuthorAsync(int id)
        {

            var emp = await _unitOfWork.Author.GetByIdAsync(id);

            if (emp == null)
            {
                return false;
            }


            await _unitOfWork.Author.DeleteAsync(id);


            await _unitOfWork.SaveAsync();

            return true;
        }
    }
}
