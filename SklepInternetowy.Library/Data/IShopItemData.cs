using SklepInternetowy.Library.Models;

namespace OnlineShop.Library.Data
{
    public interface IShopItemData
    {
        Task CreateShopItemAsync(ShopItemDbModel model);
        Task DeleteShopItem(Guid modelId);
        IEnumerable<ShopItemDbModel> GetShopItemByCategory(CategoryDbModel category);
        IEnumerable<ShopItemDbModel> GetShopItems();
        Task UpdateShopItemAsync(ShopItemDbModel model);
    }
}