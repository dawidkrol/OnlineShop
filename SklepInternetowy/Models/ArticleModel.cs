namespace OnlineShop.Model
{
    public class ArticleModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public bool IsActive { get; set; }
        public string? Link { get; set; }
        public string? LinkText { get; set; }
    }
}
