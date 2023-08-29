using AutoMapper;
using OnlineShop.Library.Data;
using OnlineShop.Model;
using SklepInternetowy.Library.Models;
using System.Collections.Generic;
using System.Xml.Linq;

namespace OnlineShop.Helpers
{
    public class ShopItemHelper : IShopItemHelper
    {
        private readonly IMapper _mapper;
        private readonly IShopItemData _shopItemData;
        private readonly ICategoryData _categoryData;

        public ShopItemHelper(IMapper mapper, IShopItemData shopItemData, ICategoryData categoryData)
        {
            _mapper = mapper;
            _shopItemData = shopItemData;
            _categoryData = categoryData;
        }
        public IEnumerable<ShopItemModel> GetShopItems()
        {
            IEnumerable<ShopItemModel> output = null;
            try
            {
                var dbData = _shopItemData.GetShopItems();
                output = _mapper.Map<IEnumerable<ShopItemModel>>(dbData);
                foreach (var item in output)
                {
                    var ct = _mapper.Map<CategoryModel>(_categoryData.GetCategory(item.CategoryId));
                    item.Category = ct;
                }

                return output;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return output;
        }

        public ShopItemModel GetShopItemsById(Guid id)
        {
            var dbData = _shopItemData.GetShopItemById(id);
            var output = _mapper.Map<ShopItemModel>(dbData);
            var ct = _mapper.Map<CategoryModel>(_categoryData.GetCategory(output.CategoryId));
            output.Category = ct;
            return output;
        }

        public IEnumerable<ShopItemModel> GetShopItemsByCategoryId(Guid id)
        {
            var dbData = _shopItemData.GetShopItemsByCategoryId(id);
            var output = _mapper.Map<IEnumerable<ShopItemModel>>(dbData);
            foreach (var item in output)
            {
                var ct = _mapper.Map<CategoryModel>(_categoryData.GetCategory(item.CategoryId));
                item.Category = ct;
            }
            return output;
        }

        public async Task CreateShopItem(ShopItemModel model)
        {
            var mapped = _mapper.Map<ShopItemDbModel>(model);
            await _shopItemData.CreateShopItemAsync(mapped);
        }

        public async Task DeleteShopItem(Guid id)
        {
            await _shopItemData.DeleteShopItem(id);
        }

        public async Task UpdateShopItem(ShopItemModel model)
        {
            var mapped = _mapper.Map<ShopItemDbModel>(model);
            await _shopItemData.UpdateShopItemAsync(mapped);
        }
    }
}
