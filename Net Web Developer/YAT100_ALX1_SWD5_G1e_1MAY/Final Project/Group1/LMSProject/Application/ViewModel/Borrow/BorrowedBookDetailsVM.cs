using LMSProject.Data.Models.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.Borrow
{
    public class BorrowedBookDetailsVM
    {

        public int Id { get; set; }

        [Required]
        [Display(Name = "Borrow Date")]
        public DateTime BorrowDate { get; set; }

        [Required]
        [Display(Name = "Defaut Returned Date")]

        // The date the book Must return
        public DateTime DefaultReturnDate { get; set; }


        [Display(Name = "Returned Date")]

        // The actual Date for return
        public DateTime? ReturnDate { get; set; }


        [Display(Name = "Note")]
        public string? Note { get; set; }

        public int PrintSerial { get; set; }

         public int MemberId { get; set; }




        public int LBId { get; set; }

        public int? LRId { get; set; }



        public string? MemberNo { get; set; }
        public string? MemberName  { get; set; }
        public string? MemberPhone { get; set; }
        public string? BookTitle { get; set; }

        public int? LRID { get; set; }
    }
    }
