using Domain.Common;

namespace Domain.Entities;

public class TeamMember : BaseAuditableEntity<Guid>
{
    // [Required]
    public string? Name { get; set; }
    // [Required]
    public string? Role { get; set; }
    // [Required]
    public string? ImageUrl { get; set; }
    public string? Email { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? Details { get; set; }
    public string? PublicId { get; set; }
}
