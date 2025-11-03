using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models;

public class Photo
{
    public int Id { get; set; }
    public string? Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }
    public bool IsAboutSlider { get; set; }

    [Required]
    public string? Category { get; set; }
}
