namespace SkFabricatorApi.Models;

public class HomeSlider
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string? PublicId { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
}