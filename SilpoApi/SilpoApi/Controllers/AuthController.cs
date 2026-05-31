using Application.Auth.Login;
using Application.Auth.Register;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace SilpoApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController(IMediator mediator, 
    UserManager<UserEntity> userManager) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        try
        {
            var result = await mediator.Send(new LoginCommand
            {
                Email = request.Email,
                Password = request.Password
            });
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await userManager.Users
            .Select(
            x => new
            {
                x.Id,
                x.Email,
                FullName = x.LastName + " " + x.FirstName

            }).ToListAsync();
        return Ok(users);
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromForm] RegisterCommand request)
    {
        try
        {
            // відправляємо команду до MediatR, яка обробить логіку аутентифікації
            await mediator.Send(request);
            return Ok(); // повертаємо результат у вигляді JSON
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message); // повертаємо код 400 + помилку, якщо щось пішло не так
        }
    }
}
