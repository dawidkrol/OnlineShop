﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SklepInternetowy;
using OnlineShop.Helpers;
using OnlineShop.Model;
using Microsoft.AspNetCore.Authorization;

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

        [HttpGet("getByCategoryId/{id}")]
        public IEnumerable<ShopItemModel> GetByCategoryId(Guid id)
        {
            return _shopItemHelper.GetShopItemsByCategoryId(id);
        }
        [Authorize]
        [HttpPost]
        public async Task Post(ShopItemModel model)
        {
            await _shopItemHelper.CreateShopItem(model);
        }
        [Authorize]
        [HttpDelete]
        public async Task Delete(Guid id)
        {
            await _shopItemHelper.DeleteShopItem(id);
        }
        [Authorize]
        [HttpPut]
        public async Task Update(ShopItemModel model)
        {
            await _shopItemHelper.UpdateShopItem(model);
        }
    }
}
