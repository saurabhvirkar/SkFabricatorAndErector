using Microsoft.Extensions.Logging;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services;

public class ClientService : IClientService
{
    private readonly IClientDetailsRepository _clientRepository;
    private readonly IPhotoService _photoService;
    private readonly ILogger<ClientService> _logger;

    public ClientService(IClientDetailsRepository clientRepository, IPhotoService photoService, ILogger<ClientService> logger)
    {
        _clientRepository = clientRepository;
        _photoService = photoService;
        _logger = logger;
    }

    public async Task<ClientDetails> AddClientAsync(AddClientRequestDto request)
    {
        _logger.LogInformation("Adding new client: {Name}", request.Name);
        if (request.File == null)
        {
            _logger.LogWarning("File is required for adding client {Name}", request.Name);
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
        _logger.LogInformation("Client added: {Name}", request.Name);
        return client;
    }

    public async Task<ClientDetails> AddClientImageAsync(int clientId, IFormFile file)
    {
        _logger.LogInformation("Adding image to client with ID {ClientId}", clientId);
        var client = await _clientRepository.GetByIdAsync(clientId) ?? throw new System.Exception("Client not found");

        var photo = await _photoService.AddPhotoAsync(file, "Clients", false);
        var imageUrl = photo.Url;
        await _clientRepository.UpdateAsync(client);
        _logger.LogInformation("Client image updated for client ID {ClientId}", clientId);
        return client;
    }

    public async Task<bool> DeleteClientAsync(int id)
    {
        _logger.LogInformation("Deleting client with ID {ClientId}", id);
        var client = await _clientRepository.GetByIdAsync(id);
        if (client == null)
        {
            _logger.LogWarning("Client with ID {ClientId} not found", id);
            return false;
        }

        await _clientRepository.DeleteAsync(client);
        _logger.LogInformation("Client deleted with ID {ClientId}", id);
        return true;
    }

    public async Task<ClientDetails?> UpdateClientAsync(int id, UpdateClientRequestDto request)
    {
        _logger.LogInformation("Updating client with ID {ClientId}", id);
        var client = await _clientRepository.GetByIdAsync(id);
        if (client == null)
        {
            _logger.LogWarning("Client with ID {ClientId} not found for update", id);
            return null;
        }

        client.Name = request.Name;
        client.ClientUrl = request.ClientUrl;
        await _clientRepository.UpdateAsync(client);
        return client;
    }
}
