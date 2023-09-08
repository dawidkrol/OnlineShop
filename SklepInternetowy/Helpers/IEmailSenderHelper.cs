using OnlineShop.Models;

namespace OnlineShop.Helpers
{
    public interface IEmailSenderHelper
    {
        void SendEmail(EmailModel model);
    }
}