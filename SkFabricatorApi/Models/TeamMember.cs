using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models
{
    public class TeamMember
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Role { get; set; }
        [Required]
        public string? ImageUrl { get; set; }
        public string? Email { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? Details { get; set; }
        public string? PublicId { get; set; }
    }
}
