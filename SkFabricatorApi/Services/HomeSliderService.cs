using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services;

public class HomeSliderService : IHomeSliderService
{
    private readonly Cloudinary _cloudinary;
    private readonly IHomeSliderRepository _homeSliderRepository;
    private readonly ILogger<HomeSliderService> _logger;

    public HomeSliderService(IOptions<CloudinarySettings> config, IHomeSliderRepository homeSliderRepository, ILogger<HomeSliderService> logger)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(acc);
        _homeSliderRepository = homeSliderRepository;
        _logger = logger;
    }

    public async Task<HomeSlider> AddHomeSliderImageAsync(int homeSliderId, IFormFile file)
    {
        var homeSlider = await _homeSliderRepository.GetByIdAsync(homeSliderId) ?? throw new System.Exception("Home slider item not found");

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

        homeSlider.ImageUrl = uploadResult.SecureUrl.AbsoluteUri;
        await _homeSliderRepository.UpdateAsync(homeSlider);
        return homeSlider;
    }

    public async Task<HomeSlider> AddHomeSliderAsync(AddHomeSliderRequestDto request)
    {
        var homeSlider = new HomeSlider
        {
            Title = request.Title,
            Description = request.Description
        };

        try
        {
            await _homeSliderRepository.AddAsync(homeSlider);
            return homeSlider;
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "Error adding home slider item to repository.");
            throw new System.Exception($"Failed to add home slider item: {ex.InnerException?.Message ?? ex.Message}", ex);
        }
    }

    public async Task<bool> DeleteHomeSliderAsync(int id)
    {
        var homeSlider = await _homeSliderRepository.GetByIdAsync(id);
        if (homeSlider == null)
        {
            return false;
        }

        if (!string.IsNullOrEmpty(homeSlider.PublicId))
        {
            var deleteParams = new DeletionParams(homeSlider.PublicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            if (result.Error != null)
            {
                _logger.LogError($"Error deleting image from Cloudinary: {result.Error.Message}");
                // Optionally, you might still want to delete the item from the DB even if image deletion fails
            }
        }

        await _homeSliderRepository.DeleteAsync(homeSlider);
        return true;
    }

    public async Task<HomeSlider?> UpdateHomeSliderAsync(int id, AddHomeSliderRequestDto request)
    {
        var homeSlider = await _homeSliderRepository.GetByIdAsync(id);
        if (homeSlider == null)
        {
            return null;
        }

        homeSlider.Title = request.Title;
        homeSlider.Description = request.Description;

        await _homeSliderRepository.UpdateAsync(homeSlider);
        return homeSlider;
    }
}
