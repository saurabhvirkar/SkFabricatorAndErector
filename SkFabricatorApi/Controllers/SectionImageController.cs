using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[Route("api/section-image")]
[ApiController]
public class SectionImageController(ISectionImageService sectionImageService) : ControllerBase
{
    private readonly ISectionImageService _sectionImageService = sectionImageService;

    [HttpPost("add-image")]
            [Authorize(Roles = "Admin,Manager")]
            public async Task<IActionResult> AddSectionImage([FromForm] AddSectionImageRequestDto request)
            {
                if (request.File == null || request.File.Length == 0)
                {
                    return BadRequest("No file uploaded.");
                }
    
                if (string.IsNullOrEmpty(request.SectionName))
                {
                    return BadRequest("Section name is required.");
                }
    
                var sectionImage = await _sectionImageService.AddSectionImageAsync(request.File, request.SectionName);
                return Ok(sectionImage);
            }
    [HttpDelete("delete-image/{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> DeleteSectionImage(int id)
    {
        var result = await _sectionImageService.DeleteSectionImageAsync(id);

        if (result)
        {
            return Ok();
        }

        return NotFound("Section image not found or failed to delete.");
    }

    [HttpGet("{sectionName}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetSectionImagesBySectionName(string sectionName)
    {
        var images = await _sectionImageService.GetSectionImagesBySectionNameAsync(sectionName);
        return Ok(images);
    }

    [HttpGet]
    [AllowAnonymous] // Allow all users to view all section images for the gallery
    public async Task<IActionResult> GetAllSectionImages()
    {
        var images = await _sectionImageService.GetAllSectionImagesAsync();
        return Ok(images);
    }
}