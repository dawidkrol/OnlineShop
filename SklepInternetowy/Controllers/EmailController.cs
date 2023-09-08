using Microsoft.AspNetCore.Mvc;
using OnlineShop.Helpers;
using OnlineShop.Models;

namespace OnlineShop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailSenderHelper _helper;

        public EmailController(IEmailSenderHelper helper)
        {
            _helper = helper;
        }

        [HttpPost]
        public void SendMail(EmailModel model)
        {
            try
            {
                _helper.SendEmail(model);
            }
            catch (Exception ex) { }
        }
    }
}
