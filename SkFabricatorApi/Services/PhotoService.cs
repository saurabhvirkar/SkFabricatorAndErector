using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;

namespace SkFabricatorApi.Services;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;
    private readonly IPhotoRepository _photoRepository;

    public PhotoService(IOptions<CloudinarySettings> config, IPhotoRepository photoRepository)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(acc);
        _photoRepository = photoRepository;
    }

    public async Task<Photo> AddPhotoAsync(IFormFile file, string category, bool isAboutSlider)
    {
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        if (uploadResult.Error != null)
        {
            throw new System.Exception(uploadResult.Error.Message);
        }

        var photo = new Photo
        {
            Url = uploadResult.SecureUrl.AbsoluteUri,
            PublicId = uploadResult.PublicId,
            Category = category,
            IsAboutSlider = isAboutSlider
        };

        await _photoRepository.AddAsync(photo);
        return photo;
    }

    public async Task<bool> DeletePhotoAsync(int photoId)
    {
        var photo = await _photoRepository.GetByIdAsync(photoId);

        if (photo == null)
        {
            return false;
        }

        if (!string.IsNullOrEmpty(photo.PublicId))
        {
            var deleteParams = new DeletionParams(photo.PublicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            if (result.Error != null)
            {
                // Log the error or handle it as needed
                return false;
            }
        }

        await _photoRepository.DeleteAsync(photo);
        return true;
    }

    public async Task<IEnumerable<Photo>> GetPhotosAsync(string? category = null)
    {
        if (string.IsNullOrEmpty(category))
        {
            return await _photoRepository.GetAllAsync();
        }
        return await _photoRepository.FindAsync(p => p.Category == category);
    }
}