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
    public class ServicesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ServicesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var services = await _context.Services.ToListAsync();
            return Ok(services);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Service service)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return Ok(service);
        }
    }
}
