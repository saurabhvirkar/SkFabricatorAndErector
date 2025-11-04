using SkFabricatorApi.Models;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services;

public interface IOurServiceService
{
    Task<OurService> AddServiceImageAsync(int serviceId, IFormFile file);
    Task<OurService> AddServiceAsync(AddOurServiceRequestDto request);
    Task<OurService> UpdateServiceAsync(int serviceId, OurService service);
    Task DeleteServiceAsync(int serviceId);
}

