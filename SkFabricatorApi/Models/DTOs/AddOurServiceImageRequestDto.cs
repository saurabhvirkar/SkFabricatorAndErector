namespace SkFabricatorApi.Models.DTOs;

public class AddOurServiceImageRequestDto
{
    public int ServiceId { get; set; }
    public IFormFile File { get; set; } = null!;
}
