using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SkFabricatorApi.Models;
using System.Threading.Tasks;

namespace SkFabricatorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
                return BadRequest("Email and password are required.");
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !(await _userManager.CheckPasswordAsync(user, model.Password)))
                return Unauthorized();

            // For demo: return basic info, in real app return JWT
            return Ok(new { user.Email, user.Role });
        }
    }

    public class LoginModel
    {
    public string? Email { get; set; }
    public string? Password { get; set; }
    }
}
