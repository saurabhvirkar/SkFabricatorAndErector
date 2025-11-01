using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Models.DTOs;
using System.Threading.Tasks;

namespace SkFabricatorApi.Services
{
    public class ServiceService : IServiceService
    {
        private readonly Cloudinary _cloudinary;
        private readonly IServiceRepository _serviceRepository;

        public ServiceService(IOptions<CloudinarySettings> config, IServiceRepository serviceRepository)
        {
            var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(acc);
            _serviceRepository = serviceRepository;
        }

        public async Task<Service> AddServiceImageAsync(int serviceId, IFormFile file)
        {
            var service = await _serviceRepository.GetByIdAsync(serviceId);
            if (service == null)
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

            service.ImageUrl = uploadResult.SecureUrl.AbsoluteUri;

            return await _serviceRepository.UpdateAsync(service);
        }

        public async Task<Service> AddServiceAsync(AddServiceRequestDto request)
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

            var service = new Service
            {
                Name = request.Name,
                Summary = request.Summary,
                Icon = request.Icon,
                ImageUrl = uploadResult.SecureUrl.AbsoluteUri
            };

            return await _serviceRepository.AddAsync(service);
        }

        public async Task<Service> UpdateServiceAsync(int serviceId, Service service)
        {
            if (serviceId != service.Id)
            {
                throw new System.Exception("Service ID mismatch");
            }

            return await _serviceRepository.UpdateAsync(service);
        }

        public async Task DeleteServiceAsync(int serviceId)
        {
            await _serviceRepository.DeleteAsync(serviceId);
        }
    }
}
