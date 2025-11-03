using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/home-slider")]
public class HomeController : ControllerBase
{
    private readonly IHomeSliderRepository _homeSliderRepository;
    private readonly IHomeSliderService _homeSliderService;
    private readonly ILogger<HomeController> _logger;

    public HomeController(IHomeSliderRepository homeSliderRepository, IHomeSliderService homeSliderService, ILogger<HomeController> logger)
    {
        _homeSliderRepository = homeSliderRepository;
        _homeSliderService = homeSliderService;
        _logger = logger;
    }

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
        try
        {
            var newHomeSlider = await _homeSliderService.AddHomeSliderAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = newHomeSlider.Id }, newHomeSlider);
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "Error adding home slider item");
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("add-image")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddHomeSliderImage([FromForm] AddHomeSliderImageRequestDto request)
    {
        try
        {
            var homeSlider = await _homeSliderService.AddHomeSliderImageAsync(request.HomeSliderId, request.File);
            return Ok(homeSlider);
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
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
        try
        {
            var updatedHomeSlider = await _homeSliderService.UpdateHomeSliderAsync(id, request);
            if (updatedHomeSlider == null)
            {
                return NotFound();
            }
            return Ok(updatedHomeSlider);
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "Error updating home slider item");
            return BadRequest(ex.Message);
        }
    }
}