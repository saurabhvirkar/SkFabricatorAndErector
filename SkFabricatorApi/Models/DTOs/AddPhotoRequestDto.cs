using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models.DTOs
{
    public class AddPhotoRequestDto
    {
        [Required]
        public required IFormFile File { get; set; }

        [Required]
        public required string Category { get; set; }
        public bool IsAboutSlider { get; set; }
    }
}
