using AutoMapper;
using OnlineShop.Library.Data;
using OnlineShop.Library.Models;
using OnlineShop.Model;

namespace OnlineShop.Helpers
{
    public class ArticlesHelper : IArticlesHelper
    {
        private readonly IMapper _mapper;
        private readonly IArticlesData _articlesData;

        public ArticlesHelper(IMapper mapper, IArticlesData articlesData)
        {
            _mapper = mapper;
            _articlesData = articlesData;
        }
        public IEnumerable<ArticleModel> GetArticles()
        {
            IEnumerable<ArticleModel> output = null;
            try
            {
                var dbData = _articlesData.GetArticles();
                output = _mapper.Map<IEnumerable<ArticleModel>>(dbData);

                return output;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return output;
        }

        public ArticleModel GetArticleById(Guid id)
        {
            var dbData = _articlesData.GetArticleById(id);
            var output = _mapper.Map<ArticleModel>(dbData);
            return output;
        }

        public async Task CreateArticle(ArticleModel model)
        {
            var mapped = _mapper.Map<ArticleDbModel>(model);
            await _articlesData.CreateArticleAsync(mapped);
        }

        public async Task DeleteArticle(Guid id)
        {
            await _articlesData.DeleteArticle(id);
        }

        public async Task UpdateArticle(ArticleModel model)
        {
            var mapped = _mapper.Map<ArticleDbModel>(model);
            await _articlesData.UpdateArticleAsync(mapped);
        }
    }
}
