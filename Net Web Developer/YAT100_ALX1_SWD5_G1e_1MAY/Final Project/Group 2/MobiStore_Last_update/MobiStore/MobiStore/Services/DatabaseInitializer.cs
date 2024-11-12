using MobiStore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MobiStore.Services
{
    public class DatabaseInitializer
    {
        public static async Task<string> SeedDataAsync(UserManager<ApplicationUser>? userManager,
                                                       RoleManager<IdentityRole>? roleManager)
        {
            if (userManager == null || roleManager == null)
            {
                Console.WriteLine("userManager or roleManager is null => exit");
                return string.Empty;
            }

            // Check if we have the admin role or not
            var exists = await roleManager.RoleExistsAsync("admin");
            if (!exists)
            {
                Console.WriteLine("Admin role is not defined and will be created");
                await roleManager.CreateAsync(new IdentityRole("admin"));
            }

            // Check if we have the seller role or not
            exists = await roleManager.RoleExistsAsync("seller");
            if (!exists)
            {
                Console.WriteLine("Seller role is not defined and will be created");
                await roleManager.CreateAsync(new IdentityRole("seller"));
            }

            // Check if we have the client role or not
            exists = await roleManager.RoleExistsAsync("client");
            if (!exists)
            {
                Console.WriteLine("Client role is not defined and will be created");
                await roleManager.CreateAsync(new IdentityRole("client"));
            }

            // Check if we have at least one admin user or not
            var adminUsers = await userManager.GetUsersInRoleAsync("admin");
            if (adminUsers.Any())
            {
                // Admin user already exists => exit
                Console.WriteLine("Admin user already exists => exit");
                return adminUsers.First().Id; // Return the existing admin user ID
            }

            // Create the admin user
            var user = new ApplicationUser()
            {
                FirstName = "Admin",
                LastName = "Admin",
                UserName = "admin@admin.com", // UserName will be used to authenticate the user
                Email = "admin@admin.com",
                CreatedAt = DateTime.Now,
            };

            string initialPassword = "admin123";

            var result = await userManager.CreateAsync(user, initialPassword);
            if (result.Succeeded)
            {
                // Set the user role
                await userManager.AddToRoleAsync(user, "admin");
                Console.WriteLine("Admin user created successfully! Please update the initial password!");
                Console.WriteLine("Email: " + user.Email);
                Console.WriteLine("Initial password: " + initialPassword);

                // Return the admin user ID
                return user.Id;
            }

            return string.Empty; // Return empty if user creation failed
        }

        public static async Task SeedProductsAsync(ApplicationDbContext context, string adminUserId)
        {
            if (context.Brands.Any())
            {
                Console.WriteLine("Brands already exist.");
            }
            else
            {
                //context.Brands.AddRange(
                //    new Brand { Name = "MSI", CreatedAt = DateTime.Now },
                //    new Brand { Name = "Acer", CreatedAt = DateTime.Now },
                //    new Brand { Name = "Lenovo", CreatedAt = DateTime.Now }
                //);
                context.Brands.AddRange(
                    new Brand { Name = "MSI", CreatedAt = DateTime.Now },
                    new Brand { Name = "Acer", CreatedAt = DateTime.Now },
                    new Brand { Name = "Lenovo", CreatedAt = DateTime.Now },
                    new Brand { Name = "Dell", CreatedAt = DateTime.Now },
                    new Brand { Name = "HP", CreatedAt = DateTime.Now },
                    new Brand { Name = "Logitech", CreatedAt = DateTime.Now },
                    new Brand { Name = "Amazon", CreatedAt = DateTime.Now },
                    new Brand { Name = "Canon", CreatedAt = DateTime.Now },
                    new Brand { Name = "Brother", CreatedAt = DateTime.Now },
                    new Brand { Name = "Lexmark", CreatedAt = DateTime.Now },
                    new Brand { Name = "Panasonic", CreatedAt = DateTime.Now },
                    new Brand { Name = "Kodak", CreatedAt = DateTime.Now },
                    new Brand { Name = "Sony", CreatedAt = DateTime.Now },
                    new Brand { Name = "Garmin", CreatedAt = DateTime.Now },
                    new Brand { Name = "Samsung", CreatedAt = DateTime.Now },
                    new Brand { Name = "Apple", CreatedAt = DateTime.Now },
                    new Brand { Name = "Motorola", CreatedAt = DateTime.Now },
                    new Brand { Name = "Nokia", CreatedAt = DateTime.Now },
                    new Brand { Name = "OnePlus", CreatedAt = DateTime.Now }
                );

                await context.SaveChangesAsync(); // Save brands to get their IDs
            }

            if (context.Categories.Any())
            {
                Console.WriteLine("Categories already exist.");
            }
            else
            {
                context.Categories.AddRange(
                    new Category { Name = "Computers", CreatedAt = DateTime.Now },
                    new Category { Name = "Accessories", CreatedAt = DateTime.Now },
                    new Category { Name = "Printers", CreatedAt = DateTime.Now },
                    new Category { Name = "Cameras", CreatedAt = DateTime.Now },
                    new Category { Name = "Other", CreatedAt = DateTime.Now },
                    new Category { Name = "Phones", CreatedAt = DateTime.Now }
                );
                await context.SaveChangesAsync(); // Save categories to get their IDs
            }

            if (context.Products.Any())
            {
                Console.WriteLine("Products already exist.");
            }
            else
            {
                //context.Products.AddRange(
                //    new Product
                //    {
                //        Name = "MSI Pulse",
                //        BrandId = 1, // MSI
                //        CategoryId = 1, // Computers
                //        Price = 899,
                //        Description = "MSI Pulse GL66 15.6\" FHD 144Hz Gaming Laptop: Intel Core i7-12700H RTX 3070 16GB 512GB NVMe SSD",
                //        ImageFileName = "22866337.jpg",
                //        CreatedAt = DateTime.Now,
                //        SellerId = adminUserId // Set the seller ID to the admin user ID
                //    },
                //    new Product
                //    {
                //        Name = "Acer Swift",
                //        BrandId = 2, // Acer
                //        CategoryId = 1, // Computers
                //        Price = 929,
                //        Description = "Acer Swift X SFX14-42G-R607 Creator Laptop | 14\" Full HD 100% sRGB | AMD Ryzen 7 5825U",
                //        ImageFileName = "84600886.jpg",
                //        CreatedAt = DateTime.Now,
                //        SellerId = adminUserId // Set the seller ID to the admin user ID
                //    },
                //    new Product
                //    {
                //        Name = "Lenovo Ideapad",
                //        BrandId = 3, // Lenovo
                //        CategoryId = 1, // Computers
                //        Price = 799,
                //        Description = "Lenovo 2022 Newest Ideapad 3 Laptop, 15.6\" HD Touchscreen, 11th Gen Intel Core i3-1115G4 Processor, 8GB DDR4 RAM, 256GB PCIe NVMe SSD",
                //        ImageFileName = "10744695.jpg",
                //        CreatedAt = DateTime.Now,
                //        SellerId = adminUserId // Set the seller ID to the admin user ID
                //    }
                //);

                context.Products.AddRange(
                    new Product
                    {
                        Name = "MSI Pulse",
                        BrandId = 1, // MSI
                        CategoryId = 1, // Computers
                        Price = 899,
                        Description = "MSI Pulse GL66 15.6\" FHD 144Hz Gaming Laptop: Intel Core i7-12700H RTX 3070 16GB 512GB NVMe SSD",
                        ImageFileName = "22866337.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Acer Swift",
                        BrandId = 2, // Acer
                        CategoryId = 1, // Computers
                        Price = 929,
                        Description = "Acer Swift X SFX14-42G-R607 Creator Laptop | 14\" Full HD 100% sRGB | AMD Ryzen 7 5825U",
                        ImageFileName = "84600886.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Lenovo Ideapad",
                        BrandId = 3, // Lenovo
                        CategoryId = 1, // Computers
                        Price = 799,
                        Description = "Lenovo 2022 Newest Ideapad 3 Laptop, 15.6\" HD Touchscreen, 11th Gen Intel Core i3-1115G4 Processor, 8GB DDR4 RAM, 256GB PCIe NVMe SSD",
                        ImageFileName = "10744695.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Dell Latitude 7000",
                        BrandId = 4, // Dell
                        CategoryId = 1, // Computers
                        Price = 1199,
                        Description = "Dell Latitude 7000 7430 14\" Notebook - Full HD - 1920 x 1080 - Intel Core i7 12th Gen i7-1265U Deca-core (10 Core) 1.80 GHz",
                        ImageFileName = "81882367.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Dell Inspiron 15",
                        BrandId = 4, // Dell
                        CategoryId = 1, // Computers
                        Price = 989,
                        Description = "Dell Inspiron 15 3000 Series 3511 Laptop, 15.6\" FHD Touchscreen, Intel Core i5-1035G1, 32GB",
                        ImageFileName = "41732775.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Dell Inspiron 3000",
                        BrandId = 4, // Dell
                        CategoryId = 1, // Computers
                        Price = 849,
                        Description = "Dell 2022 Newest Inspiron 3000 Laptop, 15.6 HD Display, Intel Celeron N4020 Processor, 8GB DDR4 RAM",
                        ImageFileName = "63529756.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "HP ENVY 200",
                        BrandId = 5, // HP
                        CategoryId = 1, // Computers
                        Price = 869,
                        Description = "HP 14\" FHD Laptop for Business and Student, AMD Ryzen3 3250U (Beat i5 7200U), 16GB RAM",
                        ImageFileName = "10590390.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "HP Pavilion 15",
                        BrandId = 5, // HP
                        CategoryId = 1, // Computers
                        Price = 789,
                        Description = "HP 2023 15\" HD IPS Laptop, Windows 11, Intel Pentium 4-Core Processor Up to 2.70GHz, 8GB RAM",
                        ImageFileName = "92970713.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "HP ENVY 14\"",
                        BrandId = 5, // HP
                        CategoryId = 1, // Computers
                        Price = 779,
                        Description = "HP Newest 14\" HD Laptop, Windows 11, Intel Celeron Dual-Core Processor Up to 2.60GHz, 4GB RAM",
                        ImageFileName = "16303427.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Keyboard MK345",
                        BrandId = 6, // Logitech
                        CategoryId = 2, // Accessories
                        Price = 59,
                        Description = "Logitech MK345 Wireless Combo Full-Sized Keyboard with Palm Rest and Mouse",
                        ImageFileName = "83655305.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Wireless Mouse",
                        BrandId = 7, // Amazon
                        CategoryId = 2, // Accessories
                        Price = 39,
                        Description = "Amazon Basics Wireless Computer Mouse with USB Nano Receiver - Black",
                        ImageFileName = "11677601.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Laptop Bag T210",
                        BrandId = 3, // Lenovo
                        CategoryId = 2, // Accessories
                        Price = 69,
                        Description = "Lenovo Laptop Shoulder Bag T210, 15.6-Inch Laptop or Tablet",
                        ImageFileName = "15587367.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Canon Pixma MG3620",
                        BrandId = 8, // Canon
                        CategoryId = 3, // Printers
                        Price = 99,
                        Description = "Canon Pixma MG3620 Wireless All-in-One Color Inkjet Printer with Mobile and Tablet Printing, Black",
                        ImageFileName = "12643487.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Brother HL-L2350DW",
                        BrandId = 9, // Brother
                        CategoryId = 3, // Printers
                        Price = 179,
                        Description = "Brother Compact Monochrome Laser Printer, HL-L2350DW, Wireless Printing",
                        ImageFileName = "89890247.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Lexmark B3442dw",
                        BrandId = 10, // Lexmark
                        CategoryId = 3, // Printers
                        Price = 319,
                        Description = "Lexmark B3442dw Black and White Laser Printer, Wireless with Ethernet, Mobile-Friendly and Cloud Connection",
                        ImageFileName = "91537624.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Panasonic LUMIX",
                        BrandId = 11, // Panasonic
                        CategoryId = 4, // Cameras
                        Price = 499,
                        Description = "Panasonic LUMIX FZ80 4K Digital Camera, 18.1 Megapixel Video Camera, 60X Zoom",
                        ImageFileName = "66899970.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "KODAK PIXPRO",
                        BrandId = 12, // Kodak
                        CategoryId = 4, // Cameras
                        Price = 299,
                        Description = "KODAK PIXPRO Friendly Zoom FZ55-BL 16MP Digital Camera with 5X Optical Zoom",
                        ImageFileName = "65286227.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Sony CyberShot",
                        BrandId = 13, // Sony
                        CategoryId = 4, // Cameras
                        Price = 999,
                        Description = "Sony CyberShot RX10 IV with 0.03 Second Auto-Focus & 25x Optical Zoom",
                        ImageFileName = "57415624.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Garmin DriveSmart",
                        BrandId = 14, // Garmin
                        CategoryId = 5, // GPS & Navigation
                        Price = 199,
                        Description = "Garmin DriveSmart 65, Built-In Voice-Controlled GPS Navigator with 6.95\" High-Res Display, Black",
                        ImageFileName = "75241241.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "SAMSUNG SmartTag",
                        BrandId = 15, // Samsung
                        CategoryId = 5, // GPS & Navigation
                        Price = 89,
                        Description = "SAMSUNG Galaxy SmartTag Bluetooth Smart Home Accessory Tracker, Attachment Locator for Lost Keys",
                        ImageFileName = "72426380.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Garmin Instinct",
                        BrandId = 14, // Garmin
                        CategoryId = 5, // GPS & Navigation
                        Price = 79,
                        Description = "Garmin Instinct, Rugged Outdoor Watch with GPS, Features Glonass and Galileo",
                        ImageFileName = "35640104.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },

                    new Product
                    {
                        Name = "iPhone 12",
                        BrandId = 16, // Apple
                        CategoryId = 6, // Smartphones
                        Price = 969,
                        Description = "Apple iPhone 12, 64GB, Black - Unlocked and compatible with any carrier of choice on GSM and CDMA networks. Tested for battery health and guaranteed to come with a battery that exceeds 90% of original capacity.",
                        ImageFileName = "11736965.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "iPhone 13",
                        BrandId = 16, // Apple
                        CategoryId = 6, // Smartphones
                        Price = 1299,
                        Description = "Apple iPhone 13 Pro 512Go Graphite - Unlocked and compatible with any carrier of choice on GSM and CDMA networks.",
                        ImageFileName = "97815739.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "iPhone 14",
                        BrandId = 16, // Apple
                        CategoryId = 6, // Smartphones
                        Price = 969.8m,
                        Description = "Apple iPhone 14 Pro 128GB Purple",
                        ImageFileName = "57380538.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Samsung Galaxy S5",
                        BrandId = 15, // Samsung
                        CategoryId = 6, // Smartphones
                        Price = 299,
                        Description = "Samsung Galaxy S5 16GB Black Unlocked",
                        ImageFileName = "80522267.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "SAMSUNG Galaxy S23",
                        BrandId = 15, // Samsung
                        CategoryId = 6, // Smartphones
                        Price = 749,
                        Description = "SAMSUNG Galaxy S23 Cell Phone, Factory Unlocked Android Smartphone, 256GB Storage, 50MP Camera, Night Mode, Long Battery Life, Adaptive Display, US Version, 2023, Lavender",
                        ImageFileName = "66017605.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "SAMSUNG Galaxy Z",
                        BrandId = 15, // Samsung
                        CategoryId = 6, // Smartphones
                        Price = 899,
                        Description = "SAMSUNG Galaxy Z Flip 3 5G Cell Phone, Factory Unlocked Android Smartphone, 256GB, Flex Mode, Super Steady Camera, Ultra Compact, US Version, Phantom Black",
                        ImageFileName = "10967363.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Moto G Power",
                        BrandId = 17, // Motorola
                        CategoryId = 6, // Smartphones
                        Price = 699,
                        Description = "Moto G Power | 2022 | 3-Day Battery | Unlocked | Made for US by Motorola | 4/128GB | 50 MP Camera | Ice Blue",
                        ImageFileName = "69725864.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "Nokia G10",
                        BrandId = 18, // Nokia
                        CategoryId = 6, // Smartphones
                        Price = 689,
                        Description = "Nokia G10 | Android 11 | Unlocked Smartphone | 3-Day Battery | Dual SIM | US Version | 3/32GB | 6.52-Inch Screen | 13MP Triple Camera | Dusk",
                        ImageFileName = "46411326.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    },
                    new Product
                    {
                        Name = "OnePlus Nord N20",
                        BrandId = 19, // OnePlus
                        CategoryId = 6, // Smartphones
                        Price = 899,
                        Description = "OnePlus Nord N20 5G | Android Smart Phone | 6.43\" AMOLED Display| 6+128GB | Unlocked | 4500 mAh Battery | 33W Fast Charging | Blue Smoke",
                        ImageFileName = "17327675.jpg",
                        CreatedAt = DateTime.Now,
                        SellerId = adminUserId // Set the seller ID to the admin user ID
                    }


                );

                await context.SaveChangesAsync();
            }
        }
    }
}





