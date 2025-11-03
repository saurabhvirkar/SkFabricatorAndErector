using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public interface IClientDetailsRepository
{
    Task<IEnumerable<ClientDetails>> GetAllAsync();
    Task<ClientDetails> AddAsync(ClientDetails clientDetails);
    Task<ClientDetails?> GetByIdAsync(int id);
    Task UpdateAsync(ClientDetails clientDetails);
    Task<bool> DeleteAsync(int id);
}
