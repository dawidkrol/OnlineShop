using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SklepInternetowy.Library.Models
{
    public class ImageDbModel
    {
        public Guid Id { get; set; }
        public string ImageUri { get; set; }
        public ShopItemDbModel ShopItem { get; set; }
    }
}
