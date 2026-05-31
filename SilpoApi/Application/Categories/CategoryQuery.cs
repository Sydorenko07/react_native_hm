using Application.Account;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Categories;

public record CategoryQuery()
    : IRequest<IEnumerable<CategoryDto>>;
