using OnlineShop.Library.Database;
using OnlineShop.Library.Models;

namespace OnlineShop.Library.Data
{
    public class ArticlesData : IArticlesData
    {
        private readonly ShopContext _shopContext;

        public ArticlesData(ShopContext shopContext)
        {
            _shopContext = shopContext;
        }

        public IEnumerable<ArticleDbModel> GetArticles()
        {
            return _shopContext.Articles
                            .Where(x => x.IsDeleted == false)
                            .OrderByDescending(x => x.CreateDate)
                            .AsEnumerable();
        }
        public ArticleDbModel GetArticleById(Guid id)
        {
            var data = _shopContext.Articles
                            .Where(x => x.IsDeleted == false)
                            .First(x => x.Id == id);

            return data;
        }
        public async Task CreateArticleAsync(ArticleDbModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var item = new ArticleDbModel
            {
                Id = Guid.NewGuid(),
                Title = model.Title,
                Description = model.Description,
                ImageUrl = model.ImageUrl,

                IsActive = model.IsActive,
                CreateDate = DateTime.Now,
                IsDeleted = false
            };

            _shopContext.Articles.Add(item);
            await _shopContext.SaveChangesAsync();
        }
        public async Task UpdateArticleAsync(ArticleDbModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var item = _shopContext.Articles
                .Single(x => x.Id == model.Id);

            item.Title = model.Title;
            item.Description = model.Description;

            item.ImageUrl = model.ImageUrl;
            item.Description = model.Description;
            item.IsActive = model.IsActive;
            item.Link = model.Link;
            item.LinkText = model.LinkText;

            await _shopContext.SaveChangesAsync();
        }
        public async Task DeleteArticle(Guid modelId)
        {
            var item = _shopContext.Articles.Single(x => x.Id == modelId);
            item.IsDeleted = true;
            await _shopContext.SaveChangesAsync();
        }
    }
}
