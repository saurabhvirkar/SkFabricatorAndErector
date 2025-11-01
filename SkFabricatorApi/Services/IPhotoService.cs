using Microsoft.AspNetCore.Http;
using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Services
{
    public interface IPhotoService
    {
        Task<Photo> AddPhotoAsync(IFormFile file, string category);
        Task<bool> DeletePhotoAsync(int photoId);
        Task<IEnumerable<Photo>> GetPhotosAsync(string category = null);
    }
}
