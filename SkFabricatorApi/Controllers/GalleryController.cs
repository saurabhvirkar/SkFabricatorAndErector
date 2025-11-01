using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkFabricatorApi.Services;
using System.Threading.Tasks;

namespace SkFabricatorApi.Controllers
{
    [Route("api/[controller]")]
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
        public async Task<IActionResult> AddPhoto(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            try
            {
                var photo = await _photoService.AddPhotoAsync(file);
                return Ok(photo);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpDelete("delete-photo/{photoId}")]
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
        public async Task<IActionResult> GetImages()
        {
            var photos = await _photoService.GetPhotosAsync();
            return Ok(photos);
        }
    }
}
