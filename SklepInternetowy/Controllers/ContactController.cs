using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShop.Helpers;
using OnlineShop.Models;

namespace OnlineShop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactHelper _contactHelper;

        public ContactController(IContactHelper contactHelper)
        {
            _contactHelper = contactHelper;
        }

        [HttpGet]
        public IEnumerable<ContactItemTemplateModel> GetContactInfo()
        {
            return _contactHelper.GetContactInfo();
        }
        [Authorize]
        [HttpPost]
        public async Task CreateContactInfo(ContactItemTemplateModel model)
        {
            await _contactHelper.AddContactInfo(model);
        }
        [Authorize]
        [HttpPut]
        public async Task EditContactInfo(ContactItemTemplateModel contactModel)
        {
            await _contactHelper.EditContactInfo(contactModel);
        }
        [Authorize]
        [HttpDelete]
        public async Task DeleteContactInfo(int id)
        {
            await _contactHelper.DeleteContactInfo(id);
        }
    }
}
