using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMSProject.Data.Models.Models
{
    public class Penalitie
    {
        public int Id { get; set; }

        [ForeignKey(nameof(Borrow))]
        public int BorrowId { get; set; }
        public Borrow Borrow { get; set; }


        //default =0
        [Display(Name = "Penalite Days")]
        public int? PenaliteDays { get; set; }


        [Display(Name = "Penalite Amount")]
        public float? PValue { get; set; }


        [Display(Name = "Is Paid")]
        public bool IsPaid { get; set; }=false;
    }
}
