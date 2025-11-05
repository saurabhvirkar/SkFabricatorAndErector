
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/clients")]
public class ClientController(IClientDetailsRepository clientRepository, IClientService clientService) : ControllerBase
{
    private readonly IClientDetailsRepository _clientRepository = clientRepository;
    private readonly IClientService _clientService = clientService;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var clients = await _clientRepository.GetAllAsync();
        return Ok(clients);
    }

    [HttpGet("{id}", Name = "GetClientById")]
    public async Task<IActionResult> GetById(int id)
    {
        var client = await _clientRepository.GetByIdAsync(id);
        if (client == null)
        {
            return NotFound();
        }
        return Ok(client);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Add([FromForm] AddClientRequestDto request)
    {
        var newClient = await _clientService.AddClientAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = newClient.Id }, newClient);
    }

    [HttpPost("add-image")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddClientImage([FromForm] AddClientImageRequestDto request)
    {
        if (request.File == null)
        {
            return BadRequest("File is required.");
        }
        var client = await _clientService.AddClientImageAsync(request.ClientId, request.File);
        return Ok(client);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _clientService.DeleteClientAsync(id);
        if (result)
        {
            return Ok();
        }
        return NotFound();
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateClientRequestDto request)
    {
        var updatedClient = await _clientService.UpdateClientAsync(id, request);
        if (updatedClient == null)
        {
            return NotFound();
        }
        return Ok(updatedClient);
    }
}

