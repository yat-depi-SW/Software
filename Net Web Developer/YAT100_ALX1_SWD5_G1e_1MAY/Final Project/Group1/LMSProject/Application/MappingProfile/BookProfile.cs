using AutoMapper;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.Book;
using LMSProjectAUTH.Application.ViewModel.BookStore;

namespace LMSProjectAUTH.Application.MappingProfile
{
    public class BookProfile:Profile
    {
        public BookProfile()
        {
            // Map from Book to BookVM, including only BookStore
            CreateMap<Book, BookVM>();
               // .ForMember(dest => dest.BookStore, opt => opt.MapFrom(src => src.BookStore));

            // Map from BookVM to Book (reverse mapping)
            CreateMap<BookVM, Book>();

            CreateMap<addBookVM, Book>();
            CreateMap<Book,addBookVM>()
                .ForMember(dest=>dest.NoOfCopies,opt=>opt.Ignore())
                .ForMember(dest=>dest.UploadBookPhoto,opt=>opt.Ignore());


            CreateMap<EditBookVM, Book>();
            CreateMap<Book, EditBookVM>()
                  .ForMember(dest => dest.UploadBookPhoto, opt => opt.Ignore());

            // Mapping for BookStore
            CreateMap<BookStore, BookStoreVM>();

            ////////////////////////////
            // Map from Book to BookVM, including only BookStore
            CreateMap<Book, BookfVM>()
                .ForMember(dest => dest.BookStore, opt => opt.MapFrom(src => src.BookStore));

            // Map from BookVM to Book (reverse mapping)
            CreateMap<BookfVM, Book>();

        }
    }
}
