using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Helpers;
using OnlineShop.Model;

namespace OnlineShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ILogger<CategoriesController> _logger;
        private readonly ICategoryHelper _categoryHelper;

        public CategoriesController(ILogger<CategoriesController> logger, ICategoryHelper categoryHelper)
        {
            _logger = logger;
            _categoryHelper = categoryHelper;
        }

        [HttpGet]
        public IEnumerable<CategoryModel> Get()
        {
            return _categoryHelper.GetCategories();
        }
        [HttpPost]
        public void CreateCategory(CategoryModel model)
        {
            _categoryHelper.AddCategory(model);
        }

        [HttpPut]
        public void UpdateCategory(CategoryModel model)
        {
            _categoryHelper.EditCategory(model);
        }

        [HttpDelete]
        public void DeleteCategory(Guid id)
        {
            _categoryHelper.RemoveCategory(id);
        }
    }
}
