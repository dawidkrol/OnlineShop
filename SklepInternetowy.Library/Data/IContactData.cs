using OnlineShop.Library.Models;

namespace OnlineShop.Library.Data
{
    public interface IContactData
    {
        Task CreateNewContactInfoData(ContactItemTemplateDbModel model);
        Task DeleteContactInfoData(int id);
        IEnumerable<ContactItemTemplateDbModel> GetContactInfo();
        Task UpdateContactData(ContactItemTemplateDbModel model);
    }
}