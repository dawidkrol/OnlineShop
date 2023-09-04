using OnlineShop.Library.Database;
using OnlineShop.Library.Models;

namespace OnlineShop.Library.Data
{
    public class ContactData : IContactData
    {
        private readonly ShopContext _shopContext;

        public ContactData(ShopContext shopContext)
        {
            _shopContext = shopContext;
        }
        public ContactDbModel GetContactInfo()
        {
            return _shopContext.Contacts.FirstOrDefault();
        }
        public async Task CreateNewContactData(ContactDbModel model)
        {
            _shopContext.Contacts.Add(model);
            await _shopContext.SaveChangesAsync();
        }

        public async Task UpdateContactData(ContactDbModel model)
        {
            var data = _shopContext.Contacts.First();
            data.OwnerName = model.OwnerName;
            data.Email = model.Email;
            data.Address = model.Address;
            data.PostalData = model.PostalData;
            await _shopContext.SaveChangesAsync();
        }
    }
}
