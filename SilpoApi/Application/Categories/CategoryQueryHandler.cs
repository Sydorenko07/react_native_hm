using Application.Account;
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

namespace Application.Categories;

public class ProductQueryHandler(AppDbContext _context, IMapper _mapper)
    : IRequestHandler<CategoryQuery, IEnumerable<CategoryDto>>
{
    public async Task<IEnumerable<CategoryDto>> Handle(CategoryQuery request, CancellationToken cancellationToken)
    {
        return _context
            .Categories
            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider);
    }
}