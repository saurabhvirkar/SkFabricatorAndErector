using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models;

public class OurService
{
    public int Id { get; set; }
    [Required]
    public string? Name { get; set; }
    public string? Summary { get; set; }
    public string? Icon { get; set; }
    public string? ImageUrl { get; set; }
}

