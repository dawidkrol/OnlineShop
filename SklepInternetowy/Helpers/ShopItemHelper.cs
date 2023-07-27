using AutoMapper;
using OnlineShop.Library.Data;
using OnlineShop.Model;

namespace OnlineShop.Helpers
{
    public class ShopItemHelper : IShopItemHelper
    {
        private readonly IMapper _mapper;
        private readonly IShopItemData _shopItemData;

        public ShopItemHelper(IMapper mapper, IShopItemData shopItemData)
        {
            _mapper = mapper;
            _shopItemData = shopItemData;
        }
        public IEnumerable<ShopItemModel> GetShopItems()
        {
            var dbData = _shopItemData.GetShopItems();
            var output = _mapper.Map<IEnumerable<ShopItemModel>>(dbData);

            return output;
        }
    }
}
