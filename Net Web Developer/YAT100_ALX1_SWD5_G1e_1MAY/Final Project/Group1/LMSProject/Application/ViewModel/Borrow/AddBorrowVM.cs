namespace LMSProjectAUTH.Application.ViewModel.Borrow
{
    public class AddBorrowVM
    {
        public DateTime BorrowDate { get; set; }
        public DateTime DefaultReturnDate { get; set; }
        public string Note { get; set; }
        public int PrintSerial { get; set; }
        public int MemberId { get; set; }

        public int LBId { get; set; }
        public int? LRId { get; set; }
        public DateTime? ReturnDate { get; set; }
    }
}
