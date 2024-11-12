using AutoMapper;
using LMSProjectAUTH.Application.ViewModel.Penalty;

namespace LMSProjectAUTH.Application.MappingProfile
{
    public class Penalty: Profile
    {
        public Penalty()
        {
            CreateMap<AddPenaltyVM, Penalty>();
            CreateMap<Penalty, AddPenaltyVM>();
        }
    }
}
