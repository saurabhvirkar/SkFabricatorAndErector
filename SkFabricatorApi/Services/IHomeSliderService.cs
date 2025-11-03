using Microsoft.AspNetCore.Http;
using SkFabricatorApi.Models;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services
{
    public interface IHomeSliderService
    {
        Task<HomeSlider> AddHomeSliderImageAsync(int homeSliderId, IFormFile file);
        Task<HomeSlider> AddHomeSliderAsync(AddHomeSliderRequestDto request);
        Task<bool> DeleteHomeSliderAsync(int id);
        Task<HomeSlider?> UpdateHomeSliderAsync(int id, AddHomeSliderRequestDto request);
    }
}
