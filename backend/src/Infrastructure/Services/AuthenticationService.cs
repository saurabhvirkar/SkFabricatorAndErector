using Microsoft.AspNetCore.Identity;
using SkFabricator.Application.Features.Authentication.Contracts;
using SkFabricator.Application.Features.Authentication.DTOs;
using SkFabricator.Infrastructure.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace SkFabricator.Infrastructure.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public AuthenticationService(UserManager<ApplicationUser> userManager, IJwtTokenGenerator jwtTokenGenerator)
        {
            _userManager = userManager;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<AuthenticationResponse> LoginAsync(LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
            {
                // Should throw an exception to be handled by middleware
                throw new System.Exception("Invalid credentials");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var token = _jwtTokenGenerator.GenerateToken(user, roles, Enumerable.Empty<System.Security.Claims.Claim>());

            return new AuthenticationResponse
            {
                Token = token
            };
        }

        public async Task<AuthenticationResponse> RegisterAsync(RegisterRequest request)
        {
            var user = new ApplicationUser
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                UserName = request.Email
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                // Should throw an exception to be handled by middleware
                throw new System.Exception(result.Errors.First().Description);
            }

            // For now, let's not assign roles.

            var roles = await _userManager.GetRolesAsync(user);
            var token = _jwtTokenGenerator.GenerateToken(user, roles, Enumerable.Empty<System.Security.Claims.Claim>());

            return new AuthenticationResponse
            {
                Token = token
            };
        }
    }
}
