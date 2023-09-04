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
        public ContactModel GetContactInfo()
        {
            return _contactHelper.GetContactInfo();
        }
        [HttpPut]
        public void EditContactInfo(ContactModel contactModel)
        {
            _contactHelper.EditContactInfo(contactModel);
        }
    }
}
