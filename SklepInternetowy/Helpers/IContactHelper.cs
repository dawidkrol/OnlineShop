using OnlineShop.Models;

namespace OnlineShop.Helpers
{
    public interface IContactHelper
    {
        Task AddContactInfo(ContactItemTemplateModel model);
        Task DeleteContactInfo(int id);
        Task EditContactInfo(ContactItemTemplateModel category);
        IEnumerable<ContactItemTemplateModel> GetContactInfo();
    }
}