using LMSProject.Application.Repository.Interface;
using LMSProject.Application.Repository.Repository;
using LMSProject.Application.Services;
using LMSProject.Data.Models;
using LMSProjectAUTH;
using LMSProjectAUTH.Application.Repository.Interface;
using LMSProjectAUTH.Application.Repository.Repository;
using LMSProjectAUTH.Application.Services;
using LMSProjectAUTH.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace LMSProject
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add database context
            builder.Services.AddDbContext<AppDBContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("defconn")));

            // Add Identity services
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
            })
            .AddEntityFrameworkStores<AppDBContext>()
            .AddDefaultTokenProviders();

            // Add AutoMapper
            builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

            // Add your services
            builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IAccountService, AccountService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<AuthorService>();
            builder.Services.AddScoped<GenreService>();
            builder.Services.AddScoped<ReturnBookService>();
            builder.Services.AddScoped<PenaltyRepository>();
            builder.Services.AddScoped<PenaltyService>();
            builder.Services.AddScoped<MemberService>();
            builder.Services.AddScoped<LibrarianService>();
            builder.Services.AddScoped<BookService>();
            builder.Services.AddScoped<BorrowService>();
            builder.Services.AddScoped<BookStoreService>();
            builder.Services.AddScoped<BookSearchRepository>();
            builder.Services.AddScoped<BookSearchService>();
            builder.Services.AddScoped<BookRepository>();

            // Configure application cookie settings
            builder.Services.ConfigureApplicationCookie(options =>
            {
                options.ExpireTimeSpan = TimeSpan.FromDays(2); // Cookie expires after 2 days
                options.SlidingExpiration = true;  // Refresh the expiration on each request
                options.LoginPath = "/Account/Login";  // Redirect to login page
                options.AccessDeniedPath = "/Account/AccessDenied"; // Redirect unauthorized users
                options.Cookie.HttpOnly = true;  // Protect against XSS
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;  // Use only over HTTPS
            });

            builder.Services.AddAuthorization(); // This is needed!

            builder.Services.AddControllersWithViews();  // This is required to use controllers

           
            // Register the hosted service
            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                // Apply database migrations
                var context = services.GetRequiredService<AppDBContext>();
                await context.Database.MigrateAsync();

                
            }

            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMiddleware<CheckForAdminMiddleware>();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            await app.RunAsync();
        }
    }

}
