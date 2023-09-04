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
        public ContactModel GetContactInfo()
        {
            return _mapper.Map<ContactModel>(_contactData.GetContactInfo());
        }

        public async Task EditContactInfo(ContactModel category)
        {
            var data = _mapper.Map<ContactDbModel>(category);
            await _contactData.UpdateContactData(data);
        }
    }
}
