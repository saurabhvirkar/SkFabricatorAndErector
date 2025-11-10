using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/our-services")]
public class OurServicesController(IOurServiceRepository ourServiceRepository, IOurServiceService ourServiceService) : ControllerBase
{
    private readonly IOurServiceRepository _ourServiceRepository = ourServiceRepository;
    private readonly IOurServiceService _ourServiceService = ourServiceService;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var ourServices = await _ourServiceRepository.GetAllAsync();
        return Ok(ourServices);
    }

    [HttpGet("{id}", Name = "GetServiceById")]
    public async Task<IActionResult> GetById(int id)
    {
        // This assumes your repository can fetch by ID.
        // We will need to add GetByIdAsync to IServiceRepository and ServiceRepository.
        var ourService = await _ourServiceRepository.GetByIdAsync(id);
        if (ourService == null)
        {
            return NotFound();
        }
        return Ok(ourService);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Add([FromForm] AddOurServiceRequestDto request)
    {
        var newService = await _ourServiceService.AddServiceAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = newService.Id }, newService);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(int id, [FromBody] OurService ourService)
    {
        if (id != ourService.Id)
        {
            return BadRequest();
        }

        await _ourServiceRepository.UpdateAsync(ourService);

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Delete(int id)
    {
        var ourService = await _ourServiceRepository.GetByIdAsync(id);
        if (ourService == null)
        {
            return NotFound();
        }

        await _ourServiceRepository.DeleteAsync(ourService);

        return NoContent();
    }

    [HttpPost("add-image")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddServiceImage([FromForm] AddOurServiceImageRequestDto request)
    {
        var service = await _ourServiceService.AddServiceImageAsync(request.ServiceId, request.File);
        return Ok(service);
    }
}
