using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models;

public class Project
{
    public int Id { get; set; }
    [Required]
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    public string? Category { get; set; }
    public string? PublicId { get; set; }
}