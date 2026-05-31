using Application.Interfaces;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Auth.Login;

/// <summary>
/// Обробник команди для входу користувача в систему.
/// </summary>
public class LoginCommandHandler(
        UserManager<UserEntity> userManager,
        ITokenService _tokenService
    ) 
    : IRequestHandler<LoginCommand, LoginResponseDto>
{
    public async Task<LoginResponseDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            throw new Exception("Invalid email or password.");
        }

        var passwordValid = await userManager.CheckPasswordAsync(user, request.Password);

        if (passwordValid == false)
        {
            throw new Exception("Invalid email or password.");
        }

        return new LoginResponseDto
        {
            Token = await _tokenService.CreateTokenAsync(user)
        };
    }
}
