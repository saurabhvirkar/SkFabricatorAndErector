using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using System.Threading.Tasks;

namespace SkFabricatorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsletterController : ControllerBase
    {
        private readonly INewsletterRepository _newsletterRepository;
        public NewsletterController(INewsletterRepository newsletterRepository)
        {
            _newsletterRepository = newsletterRepository;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Subscribe([FromBody] NewsletterSubscription sub)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await _newsletterRepository.AddAsync(sub);
            return Ok(new { success = true });
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> GetAll()
        {
            var subs = await _newsletterRepository.GetAllAsync();
            return Ok(subs);
        }
    }
}
