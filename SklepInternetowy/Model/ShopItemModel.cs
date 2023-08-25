using SklepInternetowy.Library.Models;
using System.ComponentModel.DataAnnotations;
using static System.Net.Mime.MediaTypeNames;

namespace OnlineShop.Model
{
    public class ShopItemModel
    {
        public Guid Id { get; set; }
        public Guid OwnerId { get; set; }
        public string Name { get; set; }
        public Guid CategoryId { get; set; }
        public CategoryModel? Category { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public uint Quantity { get; set; }
        public IEnumerable<ImageModel>? Images { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
    }
}
