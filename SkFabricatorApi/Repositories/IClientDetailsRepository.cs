using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Repositories
{
    public interface IClientDetailsRepository
    {
        Task<IEnumerable<ClientDetails>> GetAllAsync();
        Task<ClientDetails> AddAsync(ClientDetails clientDetails);
        Task<ClientDetails?> GetByIdAsync(int id);
        Task UpdateAsync(ClientDetails clientDetails);
        Task<bool> DeleteAsync(int id);
    }
}
