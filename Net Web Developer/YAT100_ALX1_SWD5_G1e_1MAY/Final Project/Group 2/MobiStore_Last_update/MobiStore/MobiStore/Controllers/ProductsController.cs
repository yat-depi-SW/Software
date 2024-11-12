using MobiStore.Models;
using MobiStore.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MobiStore.Controllers
{
    [Authorize(Roles = "admin,seller")]
    [Route("[controller]/[action]/{id?}")]
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly int _pageSize = 5;

        public ProductsController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<IActionResult> Index(int pageIndex = 1, string? search = null, string? column = null, string? orderBy = null)
        {
            // Get the logged-in user's Id
            var sellerId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Get all products and include brand and category
            IQueryable<Product> query = _context.Products
                .Include(p => p.Brand)
                .Include(p => p.Category);

            // Filter by seller's products if the user is a seller
            if (User.IsInRole("seller"))
            {
                query = query.Where(p => p.SellerId == sellerId);
            }

            // Apply search if the search string is provided
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => p.Name.Contains(search)
                                      || p.Brand.Name.Contains(search)
                                      || p.Category.Name.Contains(search));
            }


            // Sorting logic
            string[] validColumns = { "Id", "Name", "Brand", "Category", "Price", "CreatedAt" };
            column = validColumns.Contains(column) ? column : "Id";
            orderBy = orderBy == "asc" ? "asc" : "desc";

            query = column switch
            {
                "Name" => orderBy == "asc" ? query.OrderBy(p => p.Name) : query.OrderByDescending(p => p.Name),
                "Brand" => orderBy == "asc" ? query.OrderBy(p => p.Brand.Name) : query.OrderByDescending(p => p.Brand.Name),
                "Category" => orderBy == "asc" ? query.OrderBy(p => p.Category.Name) : query.OrderByDescending(p => p.Category.Name),
                "Price" => orderBy == "asc" ? query.OrderBy(p => p.Price) : query.OrderByDescending(p => p.Price),
                "CreatedAt" => orderBy == "asc" ? query.OrderBy(p => p.CreatedAt) : query.OrderByDescending(p => p.CreatedAt),
                _ => orderBy == "asc" ? query.OrderBy(p => p.Id) : query.OrderByDescending(p => p.Id),
            };

            // Pagination
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)_pageSize);
            var products = await query.Skip((pageIndex - 1) * _pageSize).Take(_pageSize).ToListAsync();

            ViewData["PageIndex"] = pageIndex;
            ViewData["TotalPages"] = totalPages;
            ViewData["Search"] = search ?? "";
            ViewData["Column"] = column;
            ViewData["OrderBy"] = orderBy;

            return View(products);
        }

        public async Task<IActionResult> Create()
        {
            ViewData["Brands"] = await _context.Brands.ToListAsync();
            ViewData["Categories"] = await _context.Categories.ToListAsync();
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductDto productDto)
        {
            if (productDto.ImageFile == null)
            {
                ModelState.AddModelError("ImageFile", "The image file is required");
            }

            if (!ModelState.IsValid)
            {
                ViewData["Brands"] = await _context.Brands.ToListAsync();
                ViewData["Categories"] = await _context.Categories.ToListAsync();
                return View(productDto);
            }

            string newFileName = DateTime.Now.ToString("yyyyMMddHHmmssfff") + Path.GetExtension(productDto.ImageFile.FileName);
            string imageFullPath = Path.Combine(_environment.WebRootPath, "products", newFileName);

            using (var stream = new FileStream(imageFullPath, FileMode.Create))
            {
                await productDto.ImageFile.CopyToAsync(stream);
            }

            var product = new Product
            {
                Name = productDto.Name,
                BrandId = productDto.BrandId, // Use BrandId
                CategoryId = productDto.CategoryId, // Use CategoryId
                Price = productDto.Price,
                Description = productDto.Description,
                ImageFileName = newFileName,
                CreatedAt = DateTime.Now,
                SellerId = User.FindFirstValue(ClaimTypes.NameIdentifier)!
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return RedirectToAction(nameof(Index));
            }

            var productDto = new ProductDto
            {
                Name = product.Name,
                BrandId = product.BrandId, // Use BrandId
                CategoryId = product.CategoryId, // Use CategoryId
                Price = product.Price,
                Description = product.Description,
            };

            ViewData["ProductId"] = product.Id;
            ViewData["ImageFileName"] = product.ImageFileName;
            ViewData["CreatedAt"] = product.CreatedAt.ToString("MM/dd/yyyy");
            ViewData["Brands"] = await _context.Brands.ToListAsync();
            ViewData["Categories"] = await _context.Categories.ToListAsync();


                return View(productDto);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, ProductDto productDto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return RedirectToAction(nameof(Index));
            }

            if (!ModelState.IsValid)
            {
                ViewData["ProductId"] = product.Id;
                ViewData["ImageFileName"] = product.ImageFileName;
                ViewData["CreatedAt"] = product.CreatedAt.ToString("MM/dd/yyyy");
                ViewData["Brands"] = await _context.Brands.ToListAsync();
                ViewData["Categories"] = await _context.Categories.ToListAsync();
                return View(productDto);
            }

            string newFileName = product.ImageFileName;
            if (productDto.ImageFile != null)
            {
                newFileName = DateTime.Now.ToString("yyyyMMddHHmmssfff") + Path.GetExtension(productDto.ImageFile.FileName);
                string imageFullPath = Path.Combine(_environment.WebRootPath, "products", newFileName);

                using (var stream = new FileStream(imageFullPath, FileMode.Create))
                {
                    await productDto.ImageFile.CopyToAsync(stream);
                }

                // Delete old image if it exists
                string oldImageFullPath = Path.Combine(_environment.WebRootPath, "products", product.ImageFileName);
                if (System.IO.File.Exists(oldImageFullPath))
                {
                    System.IO.File.Delete(oldImageFullPath);
                }
            }

            // Update product properties
            product.Name = productDto.Name;
            product.BrandId = productDto.BrandId; // Update BrandId
            product.CategoryId = productDto.CategoryId; // Update CategoryId
            product.Price = productDto.Price;
            product.Description = productDto.Description;
            product.ImageFileName = newFileName;


            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return RedirectToAction(nameof(Index));
            }

            string imageFullPath = Path.Combine(_environment.WebRootPath, "products", product.ImageFileName);
            if (System.IO.File.Exists(imageFullPath))
            {
                System.IO.File.Delete(imageFullPath);
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
}
