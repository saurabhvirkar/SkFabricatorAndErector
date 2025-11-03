namespace SkFabricatorApi.Models.DTOs;

public class AddProjectImageRequestDto
{
    public int ProjectId { get; set; }
    public IFormFile File { get; set; } = null!;
}