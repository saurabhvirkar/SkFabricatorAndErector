using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/home-slider")]
public class HomeController(IHomeSliderRepository homeSliderRepository, IHomeSliderService homeSliderService) : ControllerBase
{
    private readonly IHomeSliderRepository _homeSliderRepository = homeSliderRepository;
    private readonly IHomeSliderService _homeSliderService = homeSliderService;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var homeSliders = await _homeSliderRepository.GetAllAsync();
        return Ok(homeSliders);
    }

    [HttpGet("{id}", Name = "GetHomeSliderById")]
    public async Task<IActionResult> GetById(int id)
    {
        var homeSlider = await _homeSliderRepository.GetByIdAsync(id);
        if (homeSlider == null)
        {
            return NotFound();
        }
        return Ok(homeSlider);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Add([FromBody] AddHomeSliderRequestDto request)
    {
        var newHomeSlider = await _homeSliderService.AddHomeSliderAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = newHomeSlider.Id }, newHomeSlider);
    }

    [HttpPost("add-image")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddHomeSliderImage([FromForm] AddHomeSliderImageRequestDto request)
    {
        var homeSlider = await _homeSliderService.AddHomeSliderImageAsync(request.HomeSliderId, request.File);
        return Ok(homeSlider);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _homeSliderService.DeleteHomeSliderAsync(id);
        if (result)
        {
            return Ok();
        }
        return NotFound();
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(int id, [FromBody] AddHomeSliderRequestDto request)
    {
        var updatedHomeSlider = await _homeSliderService.UpdateHomeSliderAsync(id, request);
        if (updatedHomeSlider == null)
        {
            return NotFound();
        }
        return Ok(updatedHomeSlider);
    }

    [HttpGet("/health")]
    [AllowAnonymous]
    public IActionResult HealthCheck()
    {
        // This simple endpoint tells Render the API is running.
        return Ok("Healthy");
    }
}