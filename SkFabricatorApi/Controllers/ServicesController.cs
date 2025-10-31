using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using System.Linq;
using System.Threading.Tasks;

namespace SkFabricatorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceRepository _serviceRepository;
        public ServicesController(IServiceRepository serviceRepository)
        {
            _serviceRepository = serviceRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var services = await _serviceRepository.GetAllAsync();
            return Ok(services);
        }

        [HttpGet("{id}", Name = "GetServiceById")]
        public async Task<IActionResult> GetById(int id)
        {
            // This assumes your repository can fetch by ID.
            // We will need to add GetByIdAsync to IServiceRepository and ServiceRepository.
            var service = await _serviceRepository.GetByIdAsync(id);
            if (service == null)
            {
                return NotFound();
            }
            return Ok(service);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> Add([FromBody] Service service)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var newService = await _serviceRepository.AddAsync(service);
            return CreatedAtAction("GetServiceById", new { id = newService.Id }, newService);
        }
    }
}
