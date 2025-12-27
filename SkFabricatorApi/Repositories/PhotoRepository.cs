using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class PhotoRepository : GenericRepository<Photo>, IPhotoRepository
{
    private new readonly ILogger<PhotoRepository> _logger;

    public PhotoRepository(AppDbContext context, ILogger<GenericRepository<Photo>> baseLogger, ILogger<PhotoRepository> logger)
        : base(context, baseLogger)
    {
        _logger = logger;
    }

    public async Task<bool> DeletePhotoAsync(int photoId)
    {
        _logger.LogInformation("Attempting to delete photo with ID {PhotoId}", photoId);
        var photo = await _context.Photos.FindAsync(photoId);
        if (photo == null)
        {
            _logger.LogWarning("Photo with ID {PhotoId} not found", photoId);
            return false;
        }

        _context.Photos.Remove(photo);
        var result = await _context.SaveChangesAsync() > 0;
        _logger.LogInformation("Photo with ID {PhotoId} deleted: {Result}", photoId, result);
        return result;
    }

    public async Task<IEnumerable<Photo>> GetPhotosAsync(string? category = null)
    {
        if (string.IsNullOrEmpty(category))
        {
            _logger.LogInformation("Getting all photos");
            return await _context.Photos.ToListAsync();
        }

        _logger.LogInformation("Getting photos by category: {Category}", category);
        return await _context.Photos.Where(p => p.Category == category).ToListAsync();
    }
}
