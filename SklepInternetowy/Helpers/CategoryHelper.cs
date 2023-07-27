using AutoMapper;
using OnlineShop.Library.Data;
using OnlineShop.Model;

namespace OnlineShop.Helpers
{
    public class CategoryHelper : ICategoryHelper
    {
        private readonly IMapper _mapper;
        private readonly ICategoryData _categoryData;

        public CategoryHelper(IMapper mapper, ICategoryData categoryData)
        {
            _mapper = mapper;
            _categoryData = categoryData;
        }
        public IEnumerable<CategoryModel> GetCategories()
        {
            var dbData = _categoryData.GetCategories();
            var output = _mapper.Map<IEnumerable<CategoryModel>>(dbData);

            return output;
        }
    }
}
