using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services;

public class OurServiceService : IOurServiceService
{
    private readonly Cloudinary _cloudinary;
    private readonly IOurServiceRepository _ourServiceRepository;

    public OurServiceService(IOptions<CloudinarySettings> config, IOurServiceRepository ourServiceRepository)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(acc);
        _ourServiceRepository = ourServiceRepository;
    }

    public async Task<OurService> AddServiceImageAsync(int serviceId, IFormFile file)
    {
        var ourService = await _ourServiceRepository.GetByIdAsync(serviceId);
        if (ourService == null)
        {
            throw new System.Exception("Service not found");
        }

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

        ourService.ImageUrl = uploadResult.SecureUrl.AbsoluteUri;

        return await _ourServiceRepository.UpdateAsync(ourService);
    }

    public async Task<OurService> AddServiceAsync(AddOurServiceRequestDto request)
    {
        var uploadResult = new ImageUploadResult();

        if (request.File.Length > 0)
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
            Icon = request.Icon,
            ImageUrl = uploadResult.SecureUrl.AbsoluteUri
        };

        return await _ourServiceRepository.AddAsync(service);
    }

    public async Task<OurService> UpdateServiceAsync(int serviceId, OurService service)
    {
        if (serviceId != service.Id)
        {
            throw new System.Exception("Service ID mismatch");
        }

        return await _ourServiceRepository.UpdateAsync(service);
    }

    public async Task DeleteServiceAsync(int serviceId)
    {
        await _ourServiceRepository.DeleteAsync(serviceId);
    }
}