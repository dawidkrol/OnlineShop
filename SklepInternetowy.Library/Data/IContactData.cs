using OnlineShop.Library.Models;

namespace OnlineShop.Library.Data
{
    public interface IContactData
    {
        Task CreateNewContactData(ContactDbModel model);
        ContactDbModel GetContactInfo();
        Task UpdateContactData(ContactDbModel model);
    }
}