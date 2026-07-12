using Microsoft.AspNetCore.Mvc;
using SkFabricator.Application.Features.Authentication.Contracts;
using SkFabricator.Application.Features.Authentication.DTOs;
using System.Threading.Tasks;

namespace SkFabricator.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AccountController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var result = await _authenticationService.RegisterAsync(request);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await _authenticationService.LoginAsync(request);
            return Ok(result);
        }
    }
}
