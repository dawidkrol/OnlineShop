using OnlineShop.Model;

namespace OnlineShop.Helpers
{
    public interface IShopItemHelper
    {
        IEnumerable<ShopItemModel> GetShopItems();
        ShopItemModel GetShopItemsById(Guid id);
        Task CreateShopItem(ShopItemModel model);
    }
}