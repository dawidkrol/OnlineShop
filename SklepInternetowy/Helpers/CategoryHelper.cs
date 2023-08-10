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
            IEnumerable<CategoryModel> output = new List<CategoryModel>();
            try
            {
                var dbData = _categoryData.GetCategories();
                output = _mapper.Map<IEnumerable<CategoryModel>>(dbData);
            }
            catch (Exception ex)
            {

            }
            return output;
        }
    }
}
