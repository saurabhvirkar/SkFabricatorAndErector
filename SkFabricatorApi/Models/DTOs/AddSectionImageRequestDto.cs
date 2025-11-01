using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models.DTOs
{
    public class AddSectionImageRequestDto
    {
        [Required]
        public required IFormFile File { get; set; }

        [Required]
        public required string SectionName { get; set; }
    }
}
