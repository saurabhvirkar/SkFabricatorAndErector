namespace SkFabricatorApi.Models.DTOs;

public class AddHomeSliderImageRequestDto
{
    public int HomeSliderId { get; set; }
    public IFormFile File { get; set; }
}
