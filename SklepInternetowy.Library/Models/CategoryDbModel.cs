using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SklepInternetowy.Library.Models
{
    public class CategoryDbModel
    {
        public Guid Id { get; set; }
        public int OrderNumber { get; set; }
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
        public IEnumerable<ShopItemDbModel> ShopItems { get; set; }
    }
}
