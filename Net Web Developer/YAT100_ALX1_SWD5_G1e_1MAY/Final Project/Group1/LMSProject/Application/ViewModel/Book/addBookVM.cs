using LMSProject.Application.ViewModel.Genre;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace LMSProjectAUTH.Application.ViewModel.Book
{
    using Humanizer;
    using Microsoft.AspNetCore.Mvc.ModelBinding;
    using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
    using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

    public class addBookVM
    {
        [Required]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "Book Price")]
        [Range(0.01, double.MaxValue, ErrorMessage = "The price must be greater than 0.")]
        public decimal BookPrice { get; set; }

        [Required]
        [Display(Name = "Penality %")]
        [Range(1, double.MaxValue, ErrorMessage = "The percentage must be greater than 0.")]
        public int PenalityPercentage { get; set; } = 0;

        [Required]
        [Display(Name = "Genre")]
        public int GenreID { get; set; }

        [Required]
        [Display(Name = "Author")]
        public int AuthorId { get; set; }

        [Required]
        [Display(Name = "Number of Copies")]
        public int NoOfCopies { get; set; } = 1;


        // Dropdown Lists

        //[BindNever] tells the model binder not to bind this property from form data.
       // [ValidateNever] tells the validation system to skip validation for this property.
        
                [BindNever]
        [ValidateNever]
        public IEnumerable<SelectListItem>? Authors { get; set; }

        [BindNever]
        [ValidateNever]
        public IEnumerable<SelectListItem>? Genres { get; set; }

        public IFormFile? UploadBookPhoto { get; set; }

        public byte[]? BookPhoto { get; set; }
    }


}
