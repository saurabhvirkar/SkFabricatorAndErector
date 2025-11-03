namespace SkFabricatorApi.Models.DTOs;

public class AddClientRequestDto
{
    public string? Name { get; set; }
    public string? ClientUrl { get; set; }
    public IFormFile? File { get; set; }
}
