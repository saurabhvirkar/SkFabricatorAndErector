using Domain.Common;

namespace Domain.Entities;

public class Photo : BaseAuditableEntity<Guid>
{
    public string? Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }
    public bool IsAboutSlider { get; set; }

    // [Required]
    public string? Category { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
}
