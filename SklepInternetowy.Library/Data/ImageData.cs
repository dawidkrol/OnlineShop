using OnlineShop.Library.Database;
using SklepInternetowy.Library.Models;

namespace OnlineShop.Library.Data
{
    public class ImageData : IImageData
    {
        private readonly ShopContext _shopContext;

        public ImageData(ShopContext shopContext)
        {
            _shopContext = shopContext;
        }
        public async Task<IEnumerable<ImageDbModel>> GetImagesAsync()
        {
            return _shopContext.Images;
        }
        public async Task CreateImage(ImageDbModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var item = new ImageDbModel();

            item.Id = model.Id;
            item.ImageUri = model.ImageUri;

            await _shopContext.SaveChangesAsync();
        }
        public async Task UpdateImage(ImageDbModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var item = _shopContext.Images.Single(x => x.Id == model.Id);
            item.ImageUri = model.ImageUri;

            await _shopContext.SaveChangesAsync();
        }
    }
}
