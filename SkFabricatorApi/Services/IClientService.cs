
using SkFabricatorApi.Models;
using SkFabricatorApi.Models.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Services
{
    public interface IClientService
    {
        Task<ClientDetails> AddClientAsync(AddClientRequestDto request);
        Task<ClientDetails> AddClientImageAsync(int clientId, IFormFile file);
        Task<bool> DeleteClientAsync(int id);
        Task<ClientDetails?> UpdateClientAsync(int id, UpdateClientRequestDto request);
    }
}
