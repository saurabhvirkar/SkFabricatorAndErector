using Domain.Common;

namespace Domain.Entities;

public class OurService : BaseAuditableEntity<Guid>
{
    // [Required]
    public string? Name { get; set; }
    public string? Summary { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
}
