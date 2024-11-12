using AutoMapper;
using LMSProject.Application.ViewModel.Author;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.Borrow;
using LMSProjectAUTH.Application.ViewModel.ReturnBook;

namespace LMSProjectAUTH.Application.MappingProfile
{
    public class BorrowProfile:Profile
    {
        public BorrowProfile()
        {
            CreateMap<Borrow, ReturnBookVM>();
            CreateMap<ReturnBookVM, Borrow>();


            CreateMap<AddBorrowVM, Borrow>();
            CreateMap<Borrow, AddBorrowVM>();

            //CreateMap<BorrowedBookDetailsVM, Borrow>()
            // .ForPath(dest => dest.Member.Id, opt => opt.MapFrom(src => src.MemberId)) // Use ForPath for nested properties
            // .ForPath(dest => dest.Member.MemberNo, opt => opt.Ignore()) // Map MemberNo
            // .ForPath(dest => dest.BookStore.Book.Title, opt => opt.Ignore()) // Ignore nested property
            // .ForMember(dest => dest.BorrowDate, opt => opt.MapFrom(src => src.BorrowDate));
            //// .ForMember(dest=>dest.BookStore.bor); // Map top-level property


            //CreateMap<Borrow, BorrowedBookDetailsVM>()
            //        .ForMember(dest => dest.MemberId, opt => opt.MapFrom(src => src.Member.Id))
            //        .ForMember(dest => dest.MemberNo, opt => opt.MapFrom(src => src.Member.MemberNo))
            //        .ForMember(dest => dest.BookTitle, opt => opt.MapFrom(src => src.BookStore.Book.Title))
            //         //.ForMember(dest => dest.BorrowId, opt => opt.Ignore())

            ;
        }
    }
}
