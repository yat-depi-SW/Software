using LMSProjectAUTH.Application.ViewModel.Member;
using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.Penalty
{
    public class PenaltyVM
    {
        public int Id { get; set; }
        public int BorrowId { get; set; }
        public string? BookTitle { get; set; }
        public DateTime? BorrowDate { get; set; }
        public DateTime? DefaultReturnDate { get; set; }
        public int? PenaltyDays { get; set; }
        public float? PValue { get; set; }
        public bool IsPaid { get; set; }

        // Member Details
        public MemberDetailsVM MemberDetails { get; set; }
    }

}
