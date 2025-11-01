using Microsoft.AspNetCore.Http;
using SkFabricatorApi.Models;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services
{
    public interface IServiceService
    {
        Task<Service> AddServiceImageAsync(int serviceId, IFormFile file);
        Task<Service> AddServiceAsync(AddServiceRequestDto request);
        Task<Service> UpdateServiceAsync(int serviceId, Service service);
        Task DeleteServiceAsync(int serviceId);
    }
}
