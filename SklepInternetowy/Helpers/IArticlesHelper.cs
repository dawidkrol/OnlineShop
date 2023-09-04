using OnlineShop.Model;

namespace OnlineShop.Helpers
{
    public interface IArticlesHelper
    {
        Task CreateArticle(ArticleModel model);
        Task DeleteArticle(Guid id);
        ArticleModel GetArticleById(Guid id);
        IEnumerable<ArticleModel> GetArticles();
        Task UpdateArticle(ArticleModel model);
    }
}