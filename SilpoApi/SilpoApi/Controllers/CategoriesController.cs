using Application.Account;
using Application.Categories;
using MediatR;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SilpoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController(IMediator _mediator) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var res = await _mediator.Send(new CategoryQuery());
            return Ok(res);
        }
    }
}
