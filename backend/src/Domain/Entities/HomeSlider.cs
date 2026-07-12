using Domain.Common;

namespace Domain.Entities;

public class HomeSlider : BaseAuditableEntity<Guid>
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string? PublicId { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
}
