using LMSProject.Data.Models.Models;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMSProject.Data.Models.Models
{
    public class BookStore
    {
        [Key]
        public int PrintSerial { get; set; }

        [Display(Name = "Is Avaliable")]
        public bool IsAvaliable { get; set; }


        [ForeignKey(nameof(Book))]
        public int BookId { get; set; }
        public Book Book { get; set; }

    }
}
