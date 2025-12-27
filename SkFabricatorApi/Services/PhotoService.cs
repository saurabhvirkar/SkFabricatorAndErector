using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SixLabors.ImageSharp;

namespace SkFabricatorApi.Services;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;
    private readonly IPhotoRepository _photoRepository;
    private readonly ILogger<PhotoService> _logger;

    public PhotoService(IOptions<CloudinarySettings> config, IPhotoRepository photoRepository, ILogger<PhotoService> logger)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(acc);
        _photoRepository = photoRepository;
        _logger = logger;
    }

    public async Task<Photo> AddPhotoAsync(IFormFile file, string category, bool isAboutSlider)
    {
        _logger.LogInformation("Adding photo in category {Category}, isAboutSlider: {IsAboutSlider}", category, isAboutSlider);
        var uploadResult = new ImageUploadResult();
        int width = 0;
        int height = 0;

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var imageInfo = await Image.IdentifyAsync(stream);
            width = imageInfo.Width;
            height = imageInfo.Height;
            stream.Position = 0; // Reset stream position

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        if (uploadResult.Error != null)
        {
            _logger.LogError("Error uploading photo: {Error}", uploadResult.Error.Message);
            throw new System.Exception(uploadResult.Error.Message);
        }

        var photo = new Photo
        {
            Url = uploadResult.SecureUrl.AbsoluteUri,
            PublicId = uploadResult.PublicId,
            Category = category,
            IsAboutSlider = isAboutSlider,
            Width = width,
            Height = height
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