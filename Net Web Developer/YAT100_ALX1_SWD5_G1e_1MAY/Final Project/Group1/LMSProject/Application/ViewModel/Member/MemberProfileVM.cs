using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.Member
{
    public class MemberProfileVM
    {
        public string Name { get; set; }


        public string NID { get; set; }

        public string? Address { get; set; }

        public string? Phone { get; set; }

       public string MemberNo { get; set; }


        public DateOnly SubscribeDate { get; set; }

         public bool IsActive { get; set; }

        public int? NoOfBorrowBooks { get; set; } = 0;

        public int NoOfPenality { get; set; } = 0;

        public double Score { get; set; }
    }
}
