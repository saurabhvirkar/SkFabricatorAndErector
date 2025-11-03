using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/services")]
public class ServicesController : ControllerBase
{
    private readonly IServiceRepository _serviceRepository;
    private readonly IServiceService _serviceService;

    public ServicesController(IServiceRepository serviceRepository, IServiceService serviceService)
    {
        _serviceRepository = serviceRepository;
        _serviceService = serviceService;
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
    public async Task<IActionResult> Add([FromForm] AddServiceRequestDto request)
    {
        try
        {
            var newService = await _serviceService.AddServiceAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = newService.Id }, newService);
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(int id, [FromBody] Service service)
    {
        if (id != service.Id)
        {
            return BadRequest();
        }

        await _serviceRepository.UpdateAsync(service);

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Delete(int id)
    {
        var service = await _serviceRepository.GetByIdAsync(id);
        if (service == null)
        {
            return NotFound();
        }

        await _serviceRepository.DeleteAsync(id);

        return NoContent();
    }

    [HttpPost("add-image")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddServiceImage([FromForm] AddServiceImageRequestDto request)
    {
        try
        {
            var service = await _serviceService.AddServiceImageAsync(request.ServiceId, request.File);
            return Ok(service);
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
