using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/services")]
public class OurServicesController : ControllerBase
{
    private readonly IOurServiceRepository _ourServiceRepository;
    private readonly IOurServiceService _ourServiceService;

    public OurServicesController(IOurServiceRepository ourServiceRepository, IOurServiceService ourServiceService)
    {
        _ourServiceRepository = ourServiceRepository;
        _ourServiceService = ourServiceService;
    }

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
        try
        {
            var newService = await _ourServiceService.AddServiceAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = newService.Id }, newService);
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
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

        await _ourServiceRepository.DeleteAsync(id);

        return NoContent();
    }

    [HttpPost("add-image")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddServiceImage([FromForm] AddOurServiceImageRequestDto request)
    {
        try
        {
            var service = await _ourServiceService.AddServiceImageAsync(request.ServiceId, request.File);
            return Ok(service);
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
