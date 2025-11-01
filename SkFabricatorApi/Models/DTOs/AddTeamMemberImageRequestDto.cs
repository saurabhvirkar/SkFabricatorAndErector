using Microsoft.AspNetCore.Http;

namespace SkFabricatorApi.Models.DTOs
{
    public class AddTeamMemberImageRequestDto
    {
        public int TeamMemberId { get; set; }
        public IFormFile File { get; set; } = null!;
    }
}
