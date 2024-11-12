using AutoMapper;
using LMSProject.Application.ViewModel.Account;
using LMSProject.Data.Models;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.Account;

namespace LMSProject.Application.MappingProfile
{
    public class AccountProfile : Profile
    {
        public AccountProfile()
        {
            // Mapping between ViewModel and DataModel
            CreateMap<LibrarianViewModel, Librarian>();
            CreateMap<Librarian, LibrarianViewModel>();

            CreateMap<MemberViewModel, Member>();
            CreateMap<Member, MemberViewModel>();

            CreateMap<AdminRegisterationViewModel, ApplicationUser>();
            CreateMap<ApplicationUser, AdminRegisterationViewModel>()
                .ForPath(dest => dest.SetupKey, opt => opt.Ignore());


            CreateMap<LibrarianViewModel, ApplicationUser>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.NID, opt => opt.MapFrom(src => src.NID))
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Phone));


            // Mapping from MemberViewModel to ApplicationUser for shared user details
            CreateMap<MemberViewModel, ApplicationUser>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.NID, opt => opt.MapFrom(src => src.NID))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Phone));


        }

    }
}
