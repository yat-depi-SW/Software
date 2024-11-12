namespace LMSProjectAUTH.Application.ViewModel.Member
{
    public class MemberPenaltyHistoryVM
    {
        public string? BookTitle { get; set; }
        public DateTime? BorrowDate { get; set; }
        public DateTime? defaultReturnDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public int? PenaltyDays { get; set; }
        public float? PValue { get; set; }
        public bool IsPaid { get; set; }
    }
}
