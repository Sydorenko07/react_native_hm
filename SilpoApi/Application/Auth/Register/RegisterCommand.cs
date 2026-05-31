using Application.Interfaces;
using Application.Services;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Auth.Register;

public class RegisterCommand : IRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
}

public class RegisterCommandHandler(
        UserManager<UserEntity> userManager,
        IImageService _imageService
    ) : IRequestHandler<RegisterCommand>
{
    public async Task Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        // написати логіку ств. користувача в бд
        var user = await userManager.FindByEmailAsync(request.Email);
        if(user != null)
        {
            throw new Exception("Дана електронна пошта уже зареєстрована!");
        }

        string? image = null;

        if (request.Image != null)
        {
            image = await _imageService.SaveImageAsync(request.Image);
        }

        user = new UserEntity()
        {
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            UserName = request.Email,
            Image = image
        };


        var res = await userManager.CreateAsync(user, request.Password);
        if (!res.Succeeded)
        {
            string errMsg = "";
            foreach (var error in res.Errors)
            {
                errMsg += error.Description + "\n";
            }
            throw new Exception(errMsg);
        }
    }
}
