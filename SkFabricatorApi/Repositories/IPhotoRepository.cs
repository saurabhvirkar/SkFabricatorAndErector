using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Repositories
{
    public interface IPhotoRepository
    {
        Task<Photo> AddPhotoAsync(Photo photo);
        Task<bool> DeletePhotoAsync(int photoId);
        Task<Photo?> GetPhotoByIdAsync(int photoId);
        Task<IEnumerable<Photo>> GetPhotosAsync(string? category = null);
    }
}
