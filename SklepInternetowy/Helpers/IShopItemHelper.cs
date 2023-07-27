using OnlineShop.Model;

namespace OnlineShop.Helpers
{
    public interface IShopItemHelper
    {
        IEnumerable<ShopItemModel> GetShopItems();
    }
}