using Application.Account;
using Application.Categories;
using Application.Products;
using MediatR;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SilpoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(IMediator _mediator) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetProducts(int? categoryId)
        {
            IEnumerable<ProductDto> res;

            if (categoryId != null)
            {
                res = await _mediator.Send(new ProductByCategoryQuery(categoryId ?? 0));
            } else
            {
                res = await _mediator.Send(new ProductQuery());
            }
            return Ok(res);
        }
    }
}
