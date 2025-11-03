
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers
{
    [ApiController]
    [Route("api/clients")]
    public class ClientController : ControllerBase
    {
        private readonly IClientDetailsRepository _clientRepository;
        private readonly IClientService _clientService;
        private readonly ILogger<ClientController> _logger;

        public ClientController(IClientDetailsRepository clientRepository, IClientService clientService, ILogger<ClientController> logger)
        {
            _clientRepository = clientRepository;
            _clientService = clientService;
            _logger = logger;
        }

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
            try
            {
                var newClient = await _clientService.AddClientAsync(request);
                return CreatedAtAction(nameof(GetById), new { id = newClient.Id }, newClient);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error adding client");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("add-image")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> AddClientImage([FromForm] AddClientImageRequestDto request)
        {
            try
            {
                if (request.File == null)
                {
                    return BadRequest("File is required.");
                }
                var client = await _clientService.AddClientImageAsync(request.ClientId, request.File);
                return Ok(client);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
            try
            {
                var updatedClient = await _clientService.UpdateClientAsync(id, request);
                if (updatedClient == null)
                {
                    return NotFound();
                }
                return Ok(updatedClient);
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, "Error updating client");
                return BadRequest(ex.Message);
            }
        }
    }
}
