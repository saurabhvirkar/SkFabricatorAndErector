using SkFabricatorApi.Models;

namespace SkFabricatorApi.Services;

public interface IPhotoService
{
    Task<Photo> AddPhotoAsync(IFormFile file, string category, bool isAboutSlider);
    Task<bool> DeletePhotoAsync(int photoId);
    Task<IEnumerable<Photo>> GetPhotosAsync(string? category = null);
}

