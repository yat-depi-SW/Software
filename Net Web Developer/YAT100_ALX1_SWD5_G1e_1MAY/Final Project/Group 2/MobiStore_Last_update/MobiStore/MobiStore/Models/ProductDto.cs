using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace MobiStore.Models
{
    public class ProductDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = "";

        [Required]
        public int BrandId { get; set; } // Use Brand ID

        [Required]
        public int CategoryId { get; set; } // Use Category ID

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be a positive value.")]
        public decimal Price { get; set; }

        public string Description { get; set; } = "";

        [Required]
        public IFormFile? ImageFile { get; set; } // File upload for the product image
    }
}
