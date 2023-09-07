using Microsoft.EntityFrameworkCore;
using OnlineShop.Library.Models;
using SklepInternetowy.Library.Models;

namespace OnlineShop.Library.Database
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions<ShopContext> options)
            : base(options) { }
        public DbSet<CategoryDbModel> Categories { get; set; }
        public DbSet<ShopItemDbModel> ShopItems { get; set; }
        public DbSet<ImageDbModel> Images { get; set; }
        public DbSet<ArticleDbModel> Articles { get; set; }
        public DbSet<ContactItemTemplateDbModel> ContactInfo { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShopItemDbModel>(entity =>
            {
                entity.HasKey(x => x.Id);

                //entity.HasMany(x => x.Images)
                //    .WithOne(x => x.ShopItem)
                //    .HasForeignKey(x => x.Id);


                entity.Property(x => x.Price)
                    .HasColumnType("DECIMAL(18,2)");
            });
            modelBuilder.Entity<CategoryDbModel>(entity =>
            {
                entity.HasKey(x => x.Id);
            });

            modelBuilder.Entity<ImageDbModel>(entity =>
            {
                entity.HasKey(x => x.Id);
            });
            modelBuilder.Entity<ArticleDbModel>(entity =>
            {
                entity.HasKey(x => x.Id);
            });
            modelBuilder.Entity<ContactItemTemplateDbModel>(entity =>
            {
                entity.HasKey(x => x.Id);
            });
        }
    }
}
