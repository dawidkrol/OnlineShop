using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        [HttpPost]
        public void CreateCategory(CategoryModel model)
        {
            _categoryHelper.AddCategory(model);
        }
        [Authorize]
        [HttpPut]
        public void UpdateCategory(CategoryModel model)
        {
            _categoryHelper.EditCategory(model);
        }

        [Authorize]
        [HttpPut("setcategoryorder")]
        public async Task SetCategoryOrder(IEnumerable<CategoryModel> models)
        {
            await _categoryHelper.SetOrder(models);
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            try
            {
                await _categoryHelper.RemoveCategory(id);
                return Ok();
            }
            catch (InvalidDataException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
