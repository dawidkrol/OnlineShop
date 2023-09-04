using Microsoft.AspNetCore.Mvc;
using OnlineShop.Helpers;
using OnlineShop.Model;

namespace OnlineShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticlesHelper _articlesHelper;

        public ArticlesController(IArticlesHelper articlesHelper)
        {
            _articlesHelper = articlesHelper;
        }
        [HttpGet]
        public IEnumerable<ArticleModel> Get()
        {
            return _articlesHelper.GetArticles();
        }

        [HttpGet("getById/{id}")]
        public ArticleModel Get(Guid id)
        {
            return _articlesHelper.GetArticleById(id);
        }

        [HttpPost]
        public async Task Post(ArticleModel model)
        {
            await _articlesHelper.CreateArticle(model);
        }

        [HttpDelete]
        public async Task Delete(Guid id)
        {
            await _articlesHelper.DeleteArticle(id);
        }

        [HttpPut]
        public async Task Update(ArticleModel model)
        {
            await _articlesHelper.UpdateArticle(model);
        }
    }
}
