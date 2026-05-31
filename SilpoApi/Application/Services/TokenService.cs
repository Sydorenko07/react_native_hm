using Application.Interfaces;
using Domain.Entities.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services;

public class TokenService(
        IConfiguration _configuration
    ) : ITokenService
{
    public async Task<string> CreateTokenAsync(UserEntity user)
    {
        var key = _configuration["TokenKey"] ?? "";

        var claims = new List<Claim>
        {
            new Claim("id", user.Id.ToString())
        };

        var keyBytes = Encoding.UTF8.GetBytes(key);

        var symmetricSecurityKey = new SymmetricSecurityKey(keyBytes);


        var signingCredetials = new SigningCredentials(
            symmetricSecurityKey,
            SecurityAlgorithms.HmacSha256);

        var jwtSecurityToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(2),
            signingCredentials: signingCredetials
        );

        string token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

        return token;
    }
}
