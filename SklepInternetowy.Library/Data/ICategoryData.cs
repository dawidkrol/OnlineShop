using SklepInternetowy.Library.Models;

namespace OnlineShop.Library.Data
{
    public interface ICategoryData
    {
        Task CreateCategoryAsync(CategoryDbModel category);
        Task DeleteCategoryAsync(Guid categoryId);
        IEnumerable<CategoryDbModel> GetCategories();
        Task UpdateCategoryAsync(CategoryDbModel category);
        CategoryDbModel GetCategory(Guid id);
    }
}