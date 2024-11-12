using AutoMapper;
using LMSProject.Application.Repository.Interface;
using LMSProject.Application.ViewModel.Genre;
using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace LMSProject.Application.Services
{
    public class GenreService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;
        private readonly AppDBContext _context;

        public GenreService(IUnitOfWork unitOfWork, IMapper autoMapper,AppDBContext context)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
            _context = context;
        }

        public async Task<Genre> GetGenreByNameAsync(string name)
        {
            return await _context.Genres
                                 .FirstOrDefaultAsync(g => g.Name.ToLower() == name.ToLower());
        }
        public async Task AddGenreAsync(AddGenreVM addGenreVM)
        {
            var genre = _autoMapper.Map<Genre>(addGenreVM);
            await _unitOfWork.Genre.AddAsync(genre);
            await _unitOfWork.SaveAsync();
        }

        public async Task<bool> EditGenreAsync(GenreVM genreMV)
        {
            var genreDb = await _unitOfWork.Genre.GetByIdAsync(genreMV.Id);

            if (genreDb == null)
                return false;

            _autoMapper.Map(genreMV, genreDb);


            await _unitOfWork.Genre.UpdateAsync(genreDb);

            await _unitOfWork.SaveAsync();

            return true;

        }

        public async Task<IEnumerable<GenreVM>> GetAllAsync()
        {
            var genres = await _unitOfWork.Genre.GetAllAsync();
            var genresVM = _autoMapper.Map<IEnumerable<GenreVM>>(genres);
            return genresVM;
        }


        public async Task<GenreVM> GetByIdAsync(int id)
        {
            if (id == 0)
                return null;

            var genreDb = await _unitOfWork.Genre.GetByIdAsync(id);

            if (genreDb == null)
                return null;

            var genreVM = _autoMapper.Map<GenreVM>(genreDb);

            return genreVM;
        }

        public async Task<bool> DeleteGenreAsync(int genreId)
        {
            var genre = await _context.Genres
                                      .Include(g => g.Books)
                                      .FirstOrDefaultAsync(g => g.Id == genreId);

            if (genre == null)
                return false;

            // Check if there are any books referencing this genre
            if (genre.Books.Any())
                return false;

            _context.Genres.Remove(genre);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
