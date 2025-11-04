using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public interface IOurServiceRepository
{
    Task<IEnumerable<OurService>> GetAllAsync();
    Task<OurService> AddAsync(OurService service);
    Task<OurService> UpdateAsync(OurService service);
    Task DeleteAsync(int id);
    Task<OurService?> GetByIdAsync(int id);
}
