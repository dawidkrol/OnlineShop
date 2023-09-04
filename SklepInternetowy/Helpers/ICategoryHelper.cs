using OnlineShop.Model;

namespace OnlineShop.Helpers
{
    public interface ICategoryHelper
    {
        IEnumerable<CategoryModel> GetCategories();
        Task AddCategory(CategoryModel category);
        Task RemoveCategory(Guid id);
        Task EditCategory(CategoryModel category);
    }
}