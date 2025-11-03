using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models;

public class SectionImage
{
    public int Id { get; set; }
    public string? Url { get; set; }
    public string? PublicId { get; set; }

    [Required]
    public string? SectionName { get; set; }
}
