namespace SkFabricatorApi.Models.DTOs;

public class AddHomeSliderImageRequestDto
{
    public int HomeSliderId { get; set; }
    public required IFormFile File { get; set; }
}
