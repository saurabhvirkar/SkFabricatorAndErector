using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public interface IServiceRepository
{
    Task<IEnumerable<Service>> GetAllAsync();
    Task<Service> AddAsync(Service service);
    Task<Service> UpdateAsync(Service service);
    Task DeleteAsync(int id);
    Task<Service?> GetByIdAsync(int id);
}
