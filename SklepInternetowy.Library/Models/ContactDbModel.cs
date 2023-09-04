namespace OnlineShop.Library.Models
{
    public class ContactDbModel
    {
        public int Id { get; set; } = 0;
        public string Email { get; set; }
        public string OwnerName { get; set; }
        public string Address { get; set; }
        public string PostalData { get; set; }
    }
}
