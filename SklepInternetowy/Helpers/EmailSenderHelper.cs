using OnlineShop.Models;
using System.Net;
using System.Net.Mail;

namespace OnlineShop.Helpers
{
    public class EmailSenderHelper : IEmailSenderHelper
    {
        private readonly IConfiguration _configuration;

        public EmailSenderHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void SendEmail(EmailModel model)
        {
            var email = _configuration["Smtp:email"];
            var password = _configuration["Smtp:password"];
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential(email, password),
                EnableSsl = true
            };
            client.Send(model.Sender, email, model.Title, $"Od: {model.Sender}\n" + $"Na temat: {model.ProductUri}" + "\n\n" + model.Body);
        }
    }
}
