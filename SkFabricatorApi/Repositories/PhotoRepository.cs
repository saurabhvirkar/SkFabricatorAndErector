using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Repositories
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly AppDbContext _context;

        public PhotoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Photo> AddPhotoAsync(Photo photo)
        {
            _context.Photos.Add(photo);
            await _context.SaveChangesAsync();
            return photo;
        }

        public async Task<bool> DeletePhotoAsync(int photoId)
        {
            var photo = await _context.Photos.FindAsync(photoId);
            if (photo == null)
            {
                return false;
            }

            _context.Photos.Remove(photo);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Photo?> GetPhotoByIdAsync(int photoId)
        {
            return await _context.Photos.FindAsync(photoId);
        }

        public async Task<IEnumerable<Photo>> GetPhotosAsync(string category = null)
        {
            if (string.IsNullOrEmpty(category))
            {
                return await _context.Photos.ToListAsync();
            }

            return await _context.Photos.Where(p => p.Category == category).ToListAsync();
        }
    }
}
