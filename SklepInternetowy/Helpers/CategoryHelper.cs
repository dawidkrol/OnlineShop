using AutoMapper;
using OnlineShop.Library.Data;
using OnlineShop.Model;
using SklepInternetowy.Library.Models;

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
        public async Task AddCategory(CategoryModel category)
        {
            var model = _mapper.Map<CategoryDbModel>(category);
            await _categoryData.CreateCategoryAsync(model);
        }

        public async Task RemoveCategory(Guid id)
        {
            await _categoryData.DeleteCategoryAsync(id);
        }

        public async Task EditCategory(CategoryModel category)
        {
            var model = _mapper.Map<CategoryDbModel>(category);
            await _categoryData.UpdateCategoryAsync(model);
        }
    }
}
