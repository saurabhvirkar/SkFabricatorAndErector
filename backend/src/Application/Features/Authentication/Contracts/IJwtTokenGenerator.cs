using SkFabricator.Infrastructure.Identity;
using System.Collections.Generic;
using System.Security.Claims;

namespace SkFabricator.Application.Features.Authentication.Contracts
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(ApplicationUser user, IEnumerable<string> roles, IEnumerable<Claim> claims);
    }
}
