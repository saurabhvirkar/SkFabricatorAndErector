using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public interface IHomeSliderRepository
{
    Task<IEnumerable<HomeSlider>> GetAllAsync();
    Task<HomeSlider> AddAsync(HomeSlider homeSlider);
    Task<HomeSlider> UpdateAsync(HomeSlider homeSlider);
    Task<HomeSlider?> GetByIdAsync(int id);
    Task<bool> DeleteAsync(int id);
}
