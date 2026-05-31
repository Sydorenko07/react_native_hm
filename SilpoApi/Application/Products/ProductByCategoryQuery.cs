using Application.Account;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products;

public record ProductByCategoryQuery(int categoryId)
    : IRequest<IEnumerable<ProductDto>>;
