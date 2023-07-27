using SklepInternetowy.Library.Models;

namespace OnlineShop.Library.Data
{
    public interface IImageData
    {
        Task CreateImage(ImageDbModel model);
        Task<IEnumerable<ImageDbModel>> GetImagesAsync();
        Task UpdateImage(ImageDbModel model);
    }
}