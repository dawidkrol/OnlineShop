using AutoMapper;
using OnlineShop.Library.Data;
using OnlineShop.Library.Models;
using OnlineShop.Models;

namespace OnlineShop.Helpers
{
    public class ContactHelper : IContactHelper
    {
        private readonly IMapper _mapper;
        private readonly IContactData _contactData;

        public ContactHelper(IMapper mapper, IContactData contactData)
        {
            _mapper = mapper;
            _contactData = contactData;
        }
        public IEnumerable<ContactItemTemplateModel> GetContactInfo()
        {
            return _mapper.Map<IEnumerable<ContactItemTemplateModel>>(_contactData.GetContactInfo());
        }

        public async Task AddContactInfo(ContactItemTemplateModel model)
        {
            await _contactData.CreateNewContactInfoData(_mapper.Map<ContactItemTemplateDbModel>(model));
        }

        public async Task EditContactInfo(ContactItemTemplateModel category)
        {
            var data = _mapper.Map<ContactItemTemplateDbModel>(category);
            await _contactData.UpdateContactData(data);
        }

        public async Task DeleteContactInfo(int id)
        {
            await _contactData.DeleteContactInfoData(id);
        }
    }
}
