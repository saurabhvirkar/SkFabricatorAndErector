using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;
using SkFabricatorApi.Services;
using System.Threading.Tasks;

namespace SkFabricatorApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    //[Authorize(Roles = "Admin")]
    public class GalleryController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly AppDbContext _context;

        public GalleryController(IPhotoService photoService, AppDbContext context)
        {
            _photoService = photoService;
            _context = context;
        }

        [HttpPost("add-photo")]
        public async Task<IActionResult> AddPhoto(IFormFile file)
        {
            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            _context.Photos.Add(photo);

            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok(photo);
            }

            return BadRequest("Problem adding photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<IActionResult> DeletePhoto(int photoId)
        {
            var photo = await _context.Photos.FindAsync(photoId);

            if (photo == null)
            {
                return NotFound();
            }

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);

                if (result.Error != null)
                {
                    return BadRequest(result.Error.Message);
                }
            }

            _context.Photos.Remove(photo);

            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok();
            }

            return BadRequest("Failed to delete the photo");
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetImages()
        {
            var photos = await _context.Photos.ToListAsync();
            return Ok(photos);
        }
    }
}
