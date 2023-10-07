namespace OnlineShop.Library.Models
{
    public class ArticleDbModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public string? Link { get; set; }
        public string? LinkText { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
