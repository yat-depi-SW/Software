using AutoMapper;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.BookStore;

namespace LMSProjectAUTH.Application.MappingProfile
{
    public class BookStoreProfile : Profile
    {
        public BookStoreProfile()
        {
            CreateMap<BookStoreVM, BookStore>();
            CreateMap<BookStore, BookStoreVM>();
        }
    }
}
