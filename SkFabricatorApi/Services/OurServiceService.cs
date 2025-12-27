using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services;

public class OurServiceService : IOurServiceService
{
    private readonly Cloudinary _cloudinary;
    private readonly IOurServiceRepository _ourServiceRepository;
    private readonly ILogger<OurServiceService> _logger;

    public OurServiceService(IOptions<CloudinarySettings> config, IOurServiceRepository ourServiceRepository, ILogger<OurServiceService> logger)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(acc);
        _ourServiceRepository = ourServiceRepository;
        _logger = logger;
    }

    public async Task<OurService> AddServiceImageAsync(int serviceId, IFormFile file)
    {
        _logger.LogInformation("Adding image to service with ID {ServiceId}", serviceId);
        var ourService = await _ourServiceRepository.GetByIdAsync(serviceId) ?? throw new System.Exception("Service not found");

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
            _logger.LogError("Error uploading service image: {Error}", uploadResult.Error.Message);
            throw new System.Exception(uploadResult.Error.Message);
        }

        ourService.ImageUrl = uploadResult.SecureUrl.AbsoluteUri;

        await _ourServiceRepository.UpdateAsync(ourService);
        _logger.LogInformation("Service image updated for service ID {ServiceId}", serviceId);
        return ourService;
    }

    public async Task<OurService> AddServiceAsync(AddOurServiceRequestDto request)
    {
        _logger.LogInformation("Adding new service: {Name}", request.Name);
        var uploadResult = new ImageUploadResult();

        if (request.File != null && request.File.Length > 0)
        {
            using var stream = request.File.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(request.File.FileName, stream)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        if (uploadResult.Error != null)
        {
            throw new System.Exception(uploadResult.Error.Message);
        }

        var service = new OurService
        {
            Name = request.Name,
            Summary = request.Summary,
            Description = request.Description,
            ImageUrl = uploadResult.SecureUrl.AbsoluteUri
        };

        await _ourServiceRepository.AddAsync(service);
        return service;
    }

    public async Task<OurService> UpdateServiceAsync(int serviceId, OurService service)
    {
        if (serviceId != service.Id)
        {
            throw new System.Exception("Service ID mismatch");
        }

        await _ourServiceRepository.UpdateAsync(service);
        return service;
    }

    public async Task DeleteServiceAsync(int serviceId)
    {
        var service = await _ourServiceRepository.GetByIdAsync(serviceId);
        if (service != null)
        {
            await _ourServiceRepository.DeleteAsync(service);
        }
    }
}