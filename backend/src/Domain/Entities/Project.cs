using Domain.Common;

namespace Domain.Entities;

public class Project : BaseAuditableEntity<Guid>
{
    // [Required]
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    public string? Category { get; set; }
    public string? PublicId { get; set; }
}
