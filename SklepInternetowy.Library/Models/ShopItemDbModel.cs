namespace SklepInternetowy.Library.Models
{
    public class ShopItemDbModel
    {
        public Guid Id { get; set; }
        public Guid OwnerId { get; set; }
        public string Name { get; set; }
        public IEnumerable<Guid> CategoryIds { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public uint Quantity { get; set; }
        public IEnumerable<ImageDbModel>? Images { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
