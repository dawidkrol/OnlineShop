using OnlineShop.Model;

namespace OnlineShop.Helpers
{
    public interface ICategoryHelper
    {
        IEnumerable<CategoryModel> GetCategories();
    }
}