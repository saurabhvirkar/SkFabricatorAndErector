using Microsoft.AspNetCore.Http;

namespace SkFabricatorApi.Models.DTOs
{
    public class AddServiceRequestDto
    {
        public string Name { get; set; } = null!;
        public string Summary { get; set; } = null!;
        public string Icon { get; set; } = null!;
        public IFormFile File { get; set; } = null!;
    }
}
