using Microsoft.AspNetCore.Http;

namespace SkFabricatorApi.Models.DTOs
{
    public class AddProjectRequestDto
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Category { get; set; } = null!;
        public IFormFile File { get; set; } = null!;
    }
}
