using Domain.Common;

namespace Domain.Entities;

public class ClientDetails : BaseAuditableEntity<Guid>
{
    // [Required]
    public string? Name { get; set; }
    // [Required]
    public string? ImageUrl { get; set; }
    public string? ClientUrl { get; set; }
}
