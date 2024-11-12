namespace LMSProjectAUTH.Application.ViewModel.Member
{
    public class MemberDetailsVM
    {
        public int Id { get; set; }
        public string MemberNo { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
      //  public decimal Score { get; set; } // Calculated field
    }
}
