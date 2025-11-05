using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public interface IPhotoRepository : IGenericRepository<Photo>
{
    Task<bool> DeletePhotoAsync(int photoId);
    Task<IEnumerable<Photo>> GetPhotosAsync(string? category = null);
}