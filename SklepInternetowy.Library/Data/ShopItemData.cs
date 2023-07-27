using OnlineShop.Library.Database;
using SklepInternetowy.Library.Models;

namespace OnlineShop.Library.Data
{
    public class ShopItemData : IShopItemData
    {
        private readonly ShopContext _shopContext;

        public ShopItemData(ShopContext shopContext)
        {
            _shopContext = shopContext;
        }

        public IEnumerable<ShopItemDbModel> GetShopItems()
        {
            return _shopContext.ShopItems
                            .Where(x => x.IsDeleted == false)
                            .OrderByDescending(x => x.LastUpdateDate);
        }
        public IEnumerable<ShopItemDbModel> GetShopItemByCategory(CategoryDbModel category)
        {
            return _shopContext.ShopItems
                            .Where(x => x.IsDeleted == false)
                            .Where(x => x.Category.Id == category.Id)
                            .OrderByDescending(x => x.LastUpdateDate);
        }
        public async Task CreateShopItemAsync(ShopItemDbModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var item = new ShopItemDbModel();

            item.Id = Guid.NewGuid();
            item.OwnerId = model.OwnerId;
            item.Category = model.Category;

            item.Name = model.Name;
            item.Description = model.Description;
            item.Price = model.Price;
            item.Images = model.Images;
            item.Quantity = model.Quantity;

            item.CreatedDate = DateTime.Now;
            item.LastUpdateDate = DateTime.Now;

            item.IsDeleted = false;

            _shopContext.ShopItems.Add(item);
            await _shopContext.SaveChangesAsync();
        }
        public async Task UpdateShopItemAsync(ShopItemDbModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var item = _shopContext.ShopItems.Single(x => x.Id == model.Id);

            item.OwnerId = model.OwnerId;
            item.Category = model.Category;

            item.Name = model.Name;
            item.Description = model.Description;
            item.Price = model.Price;
            item.Images = model.Images;
            item.Quantity = model.Quantity;

            item.LastUpdateDate = DateTime.Now;

            await _shopContext.SaveChangesAsync();
        }
        public async Task DeleteShopItem(Guid modelId)
        {
            var item = _shopContext.ShopItems.Single(x => x.Id == modelId);
            item.IsDeleted = true;
            await _shopContext.SaveChangesAsync();
        }
    }
}
