using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.Book
{
    public class EditBookVM
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "Book Price")]
        [Range(0.01, double.MaxValue, ErrorMessage = "The price must be greater than 0.")]
        public decimal BookPrice { get; set; }

        [Required]
        [Display(Name = "Penality %")]
        [Range(0, 100, ErrorMessage = "Penality percentage must be between 0 and 100.")]
        public int PenalityPercentage { get; set; } = 0;

        [Required]
        [Display(Name = "Genre")]
        public int GenreID { get; set; }

        [Required]
        [Display(Name = "Author")]
        public int AuthorId { get; set; }

        public IFormFile? UploadBookPhoto { get; set; }

        public byte[]? BookPhoto { get; set; }

        [BindNever]
        [ValidateNever]
        public IEnumerable<SelectListItem>? Authors { get; set; }

        [BindNever]
        [ValidateNever]
        public IEnumerable<SelectListItem>? Genres { get; set; }

        [Display(Name = "No of Copies")]

        public int NoofCopies { get; set; }
    }

}
