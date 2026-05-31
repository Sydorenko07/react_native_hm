using Application.Auth.Login;
using Application.Interfaces;
using Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Account.Profile;

public class ProfileQueryHandler(UserManager<UserEntity> userManager)
    : IRequestHandler<ProfileQuery, ProfileDto>
{
    public async Task<ProfileDto> Handle(ProfileQuery request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(request.id.ToString());
        if (user == null)
        {
            throw new Exception("Unautorized");
        }

        return new ProfileDto
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Image = user.Image
        };
    }
}