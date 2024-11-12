using AutoMapper;
using LMSProject.Application.ViewModel.Genre;
using LMSProject.Data.Models.Models;

namespace LMSProject.Application.MappingProfile
{
    public class GenreProfile : Profile
    {
        public GenreProfile()
        {
            CreateMap<AddGenreVM, Genre>();
            CreateMap<Genre, AddGenreVM>();

            CreateMap<GenreVM, Genre>();
            CreateMap<Genre, GenreVM>();
        }
    }
}
