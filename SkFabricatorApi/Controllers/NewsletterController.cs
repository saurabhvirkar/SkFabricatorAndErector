using Microsoft.AspNetCore.Mvc;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace SkFabricatorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsletterController : ControllerBase
    {
        private readonly AppDbContext _context;
        public NewsletterController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Subscribe([FromBody] NewsletterSubscription sub)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _context.NewsletterSubscriptions.Add(sub);
            await _context.SaveChangesAsync();
            return Ok(new { success = true });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var subs = await _context.NewsletterSubscriptions.OrderByDescending(s => s.SubscribedAt).ToListAsync();
            return Ok(subs);
        }
    }
}
