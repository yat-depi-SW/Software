using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MobiStore.Models
{
    public class Product
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; } = "";
       // [MaxLength(100)]
       // public string Brand { get; set; } = "";
       // [MaxLength(100)]
       // public string Category { get; set; } = "";
        [Precision(16,2)]
        public decimal Price { get; set; }
        public string Description { get; set; } = "";
        [MaxLength(100)]
        public string ImageFileName { get; set; } = "";
        public DateTime CreatedAt { get; set; }

        // Foreign key for Category
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        // Foreign key for Brand
        public int BrandId { get; set; }
        public Brand Brand { get; set; }

        public string SellerId { get; set; }
        public ApplicationUser Seller { get; set; }
    }
}
