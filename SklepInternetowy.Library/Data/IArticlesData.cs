using OnlineShop.Library.Models;

namespace OnlineShop.Library.Data
{
    public interface IArticlesData
    {
        Task CreateArticleAsync(ArticleDbModel model);
        Task DeleteArticle(Guid modelId);
        ArticleDbModel GetArticleById(Guid id);
        IEnumerable<ArticleDbModel> GetArticles();
        Task UpdateArticleAsync(ArticleDbModel model);
    }
}