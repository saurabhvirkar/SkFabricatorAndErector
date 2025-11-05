using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;


namespace SkFabricatorApi.Repositories;

public class PhotoRepository(AppDbContext context) : GenericRepository<Photo>(context), IPhotoRepository
{
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

    public async Task<IEnumerable<Photo>> GetPhotosAsync(string? category = null)
    {
        if (string.IsNullOrEmpty(category))
        {
            return await _context.Photos.ToListAsync();
        }

        return await _context.Photos.Where(p => p.Category == category).ToListAsync();
    }
}
