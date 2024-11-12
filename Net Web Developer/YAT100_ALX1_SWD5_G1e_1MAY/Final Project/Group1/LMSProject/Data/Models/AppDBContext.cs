using AutoMapper.Execution;
using LMSProject.Data.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace LMSProject.Data.Models
{
    public class AppDBContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Author> Authors { get; set; }
        public DbSet<Genre> Genres { get; set; }

        public DbSet<Book> Books { get; set; }

        public DbSet<BookStore> BookStores { get; set; }
        public DbSet<Borrow> Borrows { get; set; }
        public DbSet<Penalitie> penalities { get; set; }

        public DbSet<LMSProject.Data.Models.Models.Member> Members { get; set; }

        public DbSet<Librarian> Librarians { get; set; }

        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //specify the decimal Precision for Book price
            builder.Entity<Book>().Property(b => b.BookPrice).HasPrecision(18, 4);

            //ApplicationUser
            builder.Entity<ApplicationUser>().HasIndex(u => u.NID).IsUnique();

            // relation between Librarian and user
            builder.Entity<Librarian>()
            .HasOne(l => l.ApplicationUser)
            .WithMany()
            .HasForeignKey(l => l.ApplicationUserId);

            //relation between Member and User
            builder.Entity<LMSProject.Data.Models.Models.Member>()
                .HasOne(m => m.ApplicationUser)
                .WithMany()
                .HasForeignKey(m => m.ApplicationUserId);


            //Relation between Borrow and Memeber with DeleteBehavior 
            builder.Entity<Borrow>()
                    .HasOne(b => b.Member)
                    .WithMany()
                    .HasForeignKey(b => b.MemberId)
                    .OnDelete(DeleteBehavior.Restrict);

            // Relation between Book and Author with DeleteBehavior.Restrict
            builder.Entity<Book>()
                .HasOne(b => b.Authors)
                .WithMany(a => a.Books)
                .HasForeignKey(b => b.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

            // Relation between Book and Genre with DeleteBehavior.Restrict
            builder.Entity<Book>()
                .HasOne(b => b.Genre)
                .WithMany(g => g.Books)
                .HasForeignKey(b => b.GenreID)
                .OnDelete(DeleteBehavior.Restrict);

            // Relation between Book and BookStore with DeleteBehavior.Restrict
            builder.Entity<BookStore>()
                .HasOne(bs => bs.Book)
                .WithMany(b => b.BookStore)
                .HasForeignKey(bs => bs.BookId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<IdentityRole>().HasData(
                   new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
                   new IdentityRole { Name = "Librarian", NormalizedName = "LIBRARIAN" },
                   new IdentityRole { Name = "Member", NormalizedName = "MEMBER" }
               );

        }


        
    }
}
