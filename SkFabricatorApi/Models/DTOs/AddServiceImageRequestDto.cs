namespace SkFabricatorApi.Models.DTOs;

public class AddServiceImageRequestDto
{
    public int ServiceId { get; set; }
    public IFormFile File { get; set; } = null!;
}
