using Microsoft.AspNetCore.Mvc;

namespace SkFabricatorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AboutController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAboutContent()
        {
            return Ok("Welcome to the About Page API!");
        }
    }
}
