using OnlineShop.Models;

namespace OnlineShop.Helpers
{
    public interface IContactHelper
    {
        Task EditContactInfo(ContactModel category);
        ContactModel GetContactInfo();
    }
}