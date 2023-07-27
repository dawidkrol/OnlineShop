using OnlineShop.Library.Database;
using SklepInternetowy.Library.Models;

namespace OnlineShop.Library.Data
{
    public class CategoryData : ICategoryData
    {
        private readonly ShopContext _shopContext;

        public CategoryData(ShopContext shopContext)
        {
            _shopContext = shopContext;
        }
        public IEnumerable<CategoryDbModel> GetCategories()
        {
            return _shopContext.Categories.Where(x => x.IsDeleted == false);
        }
        public async Task CreateCategoryAsync(CategoryDbModel category)
        {
            if (category == null)
            {
                throw new ArgumentNullException(nameof(category));
            }

            var item = new CategoryDbModel();

            item.Id = Guid.NewGuid();

            item.Name = category.Name;

            item.IsDeleted = false;

            _shopContext.Categories.Add(item);
            await _shopContext.SaveChangesAsync();
        }
        public async Task UpdateCategoryAsync(CategoryDbModel category)
        {
            if (category == null)
            {
                throw new ArgumentNullException(nameof(category));
            }

            var item = _shopContext.Categories.Single(x => x.Id == category.Id);

            item.Name = category.Name;

            await _shopContext.SaveChangesAsync();
        }
        public async Task DeleteCategoryAsync(Guid categoryId)
        {
            var item = _shopContext.Categories.Single(x => x.Id == categoryId);
            item.IsDeleted = true;

            await _shopContext.SaveChangesAsync();
        }
    }
}
