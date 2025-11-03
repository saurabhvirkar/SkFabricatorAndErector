using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkFabricatorApi.Services;
using System.Threading.Tasks;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers
{
    [Route("api/gallery")]
    [ApiController]
    [AllowAnonymous]
    public class GalleryController : ControllerBase
    {
        private readonly IPhotoService _photoService;

        public GalleryController(IPhotoService photoService)
        {
            _photoService = photoService;
        }

        [HttpPost("add-photo")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> AddPhoto([FromForm] AddPhotoRequestDto request)
        {
            if (request.File == null || request.File.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (string.IsNullOrEmpty(request.Category))
            {
                return BadRequest("Category is required.");
            }

            try
            {
                var photo = await _photoService.AddPhotoAsync(request.File, request.Category, request.IsAboutSlider);
                return Ok(photo);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-photo/{photoId}")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> DeletePhoto(int photoId)
        {
            var result = await _photoService.DeletePhotoAsync(photoId);

            if (result)
            {
                return Ok();
            }

            return NotFound("Photo not found or failed to delete.");
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetImages([FromQuery] string? category = null)
        {
            var photos = await _photoService.GetPhotosAsync(category);
            return Ok(photos);
        }
    }
}