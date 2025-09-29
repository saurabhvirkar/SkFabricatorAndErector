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
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projects = await _context.Projects.ToListAsync();
            return Ok(projects);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Project project)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return Ok(project);
        }
    }
}
