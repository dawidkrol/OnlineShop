using OnlineShop.Library.Database;
using OnlineShop.Library.Models;
using System.ComponentModel.DataAnnotations;

namespace OnlineShop.Library.Data
{
    public class ContactData : IContactData
    {
        private readonly ShopContext _shopContext;

        public ContactData(ShopContext shopContext)
        {
            _shopContext = shopContext;
        }
        public IEnumerable<ContactItemTemplateDbModel> GetContactInfo()
        {
            return _shopContext.ContactInfo;
        }
        public async Task CreateNewContactInfoData(ContactItemTemplateDbModel model)
        {
            var data = new ContactItemTemplateDbModel()
            {
                Title = model.Title,
                Value = model.Value,
            };
            _shopContext.ContactInfo.Add(data);
            await _shopContext.SaveChangesAsync();
        }

        public async Task UpdateContactData(ContactItemTemplateDbModel model)
        {
            var data = _shopContext.ContactInfo.Single(x => x.Id == model.Id);
            data.Title = model.Title;
            data.Value = model.Value;
            await _shopContext.SaveChangesAsync();
        }

        public async Task DeleteContactInfoData(int id)
        {
            var ent = _shopContext.ContactInfo.Single(x => x.Id == id);
            _shopContext.ContactInfo.Remove(ent);
            await _shopContext.SaveChangesAsync();
        }
    }
}
