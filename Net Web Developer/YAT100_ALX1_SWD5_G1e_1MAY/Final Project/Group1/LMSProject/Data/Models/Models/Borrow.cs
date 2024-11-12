using LMSProject.Data.Models.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMSProject.Data.Models.Models
{
    public class Borrow
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


        [ForeignKey(nameof(BookStore))]
        public int PrintSerial { get; set; }
        public BookStore BookStore { get; set; }


        [ForeignKey(nameof(Member))]
        public int MemberId { get; set; }
        public Member Member { get; set; }


        //Librarian register book borrow id
        [ForeignKey(nameof(librarianRegisterborrow))]
        public int LBId { get; set; }
        public Librarian librarianRegisterborrow { get; set; }



        //Librarian register book return id

        [ForeignKey(nameof(librarianRegisterReturn))]
        public int? LRId { get; set; }
        public Librarian librarianRegisterReturn { get; set; }

        public IEnumerable<BookStore> BookStores { get; set; }

        public Penalitie Penalitie { get; set; }
    }
}


