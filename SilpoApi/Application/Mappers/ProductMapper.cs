using Application.Products;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappers;

public class ProductMapper : Profile
{
    public ProductMapper()
    {
        CreateMap<ProductEntity, ProductDto>()
            .ForMember(x => x.CategoryName, opt => opt.MapFrom(x => x.Category.Name));
    }
}
