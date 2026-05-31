using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities;

public class ProductEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }

    public string Image { get; set; } = string.Empty;

    [ForeignKey(nameof(Category))]
    public int CategoryId { get; set; }
    public CategoryEntity Category { get; set; } = new();
}
