namespace SkFabricatorApi.Models.DTOs;

public class AddOurServiceRequestDto
{
    public string? Name { get; set; }
    public string? Summary { get; set; }
    public string? Description { get; set; }
    public IFormFile? File { get; set; }
}

