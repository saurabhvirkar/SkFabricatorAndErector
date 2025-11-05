using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services;

public class ClientService(IClientDetailsRepository clientRepository, IPhotoService photoService) : IClientService
{
    private readonly IClientDetailsRepository _clientRepository = clientRepository;
    private readonly IPhotoService _photoService = photoService;

    public async Task<ClientDetails> AddClientAsync(AddClientRequestDto request)
    {
        if (request.File == null)
        {
            throw new System.Exception("File is required.");
        }
        var photo = await _photoService.AddPhotoAsync(request.File, "Clients", false);
        var imageUrl = photo.Url;

        var client = new ClientDetails
        {
            Name = request.Name,
            ClientUrl = request.ClientUrl,
            ImageUrl = imageUrl
        };

        await _clientRepository.AddAsync(client);
        return client;
    }

    public async Task<ClientDetails> AddClientImageAsync(int clientId, IFormFile file)
    {
        var client = await _clientRepository.GetByIdAsync(clientId) ?? throw new System.Exception("Client not found");

        var photo = await _photoService.AddPhotoAsync(file, "Clients", false);
        var imageUrl = photo.Url;
        await _clientRepository.UpdateAsync(client);
        return client;
    }

    public async Task<bool> DeleteClientAsync(int id)
    {
        var client = await _clientRepository.GetByIdAsync(id);
        if (client == null)
        {
            return false;
        }

        await _clientRepository.DeleteAsync(client);
        return true;
    }

    public async Task<ClientDetails?> UpdateClientAsync(int id, UpdateClientRequestDto request)
    {
        var client = await _clientRepository.GetByIdAsync(id);
        if (client == null)
        {
            return null;
        }

        client.Name = request.Name;
        client.ClientUrl = request.ClientUrl;
        await _clientRepository.UpdateAsync(client);
        return client;
    }
}
