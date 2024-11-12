using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace LMSProject.Data.Models
{
    public class ApplicationUser: IdentityUser
    {
    
        public string Name { get; set; }

      
        public string NID { get; set; }

        public string? Address { get; set; }

        public string? Phone { get; set; }
    }
}
