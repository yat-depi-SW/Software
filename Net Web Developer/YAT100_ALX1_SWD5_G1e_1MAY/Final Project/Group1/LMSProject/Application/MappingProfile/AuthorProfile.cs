using AutoMapper;
using LMSProject.Application.ViewModel.Author;
using LMSProject.Data.Models.Models;

namespace LMSProject.Application.MappingProfile
{
    public class AuthorProfile : Profile
    {
        public AuthorProfile()
        {
            CreateMap<AddAuthorVM, Author>();
            CreateMap<Author, AddAuthorVM>();

            CreateMap<AuthorVM, Author>();
            CreateMap<Author, AuthorVM>();
        }
    }
}
