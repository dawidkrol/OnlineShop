using Microsoft.EntityFrameworkCore;
using SklepInternetowy.Library.Models;

namespace SklepInternetowy.Database
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions<ShopContext> options)
            : base(options) { }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ShopItem> ShopItems { get; set; }
        public DbSet<Image> Images { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<ShopItem>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<Image>()
                .HasKey(x => x.Id);

            modelBuilder.Entity<ShopItem>()
                .HasMany(x => x.Images);
        }
    }
}
