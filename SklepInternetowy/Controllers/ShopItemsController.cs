using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SklepInternetowy.Controllers;
using SklepInternetowy;
using OnlineShop.Helpers;
using OnlineShop.Model;

namespace OnlineShop.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShopItemsController : ControllerBase
    {
        private readonly ILogger<ShopItemsController> _logger;
        private readonly IShopItemHelper _shopItemHelper;

        public ShopItemsController(ILogger<ShopItemsController> logger, IShopItemHelper shopItemHelper)
        {
            _logger = logger;
            _shopItemHelper = shopItemHelper;
        }

        [HttpGet]
        public IEnumerable<ShopItemModel> Get()
        {
            return _shopItemHelper.GetShopItems();
        }

        [HttpGet("getById/{id}")]
        public ShopItemModel Get(Guid id)
        {
            return _shopItemHelper.GetShopItemsById(id);
        }
        [HttpPost]
        public async Task Post(ShopItemModel model)
        {
            await _shopItemHelper.CreateShopItem(model);
        }
        [HttpDelete]
        public async Task Delete(Guid id)
        {
            await _shopItemHelper.DeleteShopItem(id);
        }
    }
}
