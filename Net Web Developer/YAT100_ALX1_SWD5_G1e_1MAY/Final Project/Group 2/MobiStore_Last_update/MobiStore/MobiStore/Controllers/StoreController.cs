using Microsoft.AspNetCore.Mvc;
using MobiStore.Services;
using MobiStore.Models;
using Microsoft.EntityFrameworkCore;

namespace MobiStore.Controllers
{
    public class StoreController: Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly int pageSize = 8;
        public StoreController(ApplicationDbContext context)
        {
            this._context = context;
        }

        public IActionResult Index(int pageIndex, string? search, string? brand, string? category, string? sort)
        {
            IQueryable<Product> query = _context.Products
                                                .Include(p => p.Brand) // Include Brand
                                                .Include(p => p.Category)
                                                .Include(p=>p.Seller); // Include Category

            // Search functionality
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => p.Name.Contains(search));
            }

            // Filter by brand
            if (!string.IsNullOrEmpty(brand))
            {
                query = query.Where(p => p.Brand.Name.Contains(brand));
            }

            // Filter by category
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(p => p.Category.Name.Contains(category));
            }

            // Sort functionality
            switch (sort)
            {
                case "price_asc":
                    query = query.OrderBy(p => p.Price);
                    break;
                case "price_desc":
                    query = query.OrderByDescending(p => p.Price);
                    break;
                default:
                    // Newest products first
                    query = query.OrderByDescending(p => p.Id);
                    break;
            }

            // Pagination functionality
            if (pageIndex < 1)
            {
                pageIndex = 1;
            }

            int count = query.Count();
            int totalPages = (int)Math.Ceiling((decimal)count / pageSize);
            query = query.Skip((pageIndex - 1) * pageSize).Take(pageSize);

            var products = query.ToList();

            ViewBag.Products = products;
            ViewBag.PageIndex = pageIndex;
            ViewBag.TotalPages = totalPages;

            var storeSearchModel = new StoreSearchModel
            {
                Search = search,
                Brand = brand,
                Category = category,
                Sort = sort
            };

            return View(storeSearchModel);
        }

        public IActionResult Details(int id)
        {
            var product = _context.Products
                                  .Include(p => p.Brand)
                                  .Include(p => p.Category)
                                  .Include(p => p.Seller)
                                  .FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return RedirectToAction("Index", "Store");
            }

            return View(product);
        }


    }
}
