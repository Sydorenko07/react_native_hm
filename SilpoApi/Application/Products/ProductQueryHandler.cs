using Application.Account;
using Application.Products;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products;

public class ProductQueryHandler(AppDbContext _context, IMapper _mapper)
    : IRequestHandler<ProductQuery, IEnumerable<ProductDto>>
{
    public async Task<IEnumerable<ProductDto>> Handle(ProductQuery request, CancellationToken cancellationToken)
    {
        return _context
            .Products
            .ProjectTo<ProductDto>(_mapper.ConfigurationProvider);
    }
}