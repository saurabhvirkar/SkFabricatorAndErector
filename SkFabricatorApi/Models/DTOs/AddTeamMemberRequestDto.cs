using Microsoft.AspNetCore.Http;

namespace SkFabricatorApi.Models.DTOs
{
    public class AddTeamMemberRequestDto
    {
        public string Name { get; set; } = null!;
        public string Role { get; set; } = null!;
        public IFormFile File { get; set; } = null!;
        public string? Email { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? Details { get; set; }
    }
}
