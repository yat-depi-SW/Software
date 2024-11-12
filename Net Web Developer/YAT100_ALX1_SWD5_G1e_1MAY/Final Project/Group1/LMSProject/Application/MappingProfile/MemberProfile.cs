using AutoMapper;
using LMSProject.Application.ViewModel.Author;
using LMSProject.Data.Models.Models;
using LMSProjectAUTH.Application.ViewModel.Member;


namespace LMSProjectAUTH.Application.MappingProfile
{
    public class MemberProfile:Profile
    {
        public MemberProfile()
        {
            ////MemberVM
            CreateMap<MemberDetailsVM, Member>();
            CreateMap<Member, MemberDetailsVM>();

            CreateMap<MemberVM, Member>();
            CreateMap<Member, MemberVM>();
        }
    }
}
