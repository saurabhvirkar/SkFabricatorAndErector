using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/team")]
public class TeamController : ControllerBase
{
    private readonly ITeamRepository _teamRepository;
    private readonly ITeamService _teamService;
    private readonly ILogger<TeamController> _logger;

    public TeamController(ITeamRepository teamRepository, ITeamService teamService, ILogger<TeamController> logger)
    {
        _teamRepository = teamRepository;
        _teamService = teamService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var teamMembers = await _teamRepository.GetAllAsync();
        return Ok(teamMembers);
    }

    [HttpGet("{id}", Name = "GetTeamMemberById")]
    public async Task<IActionResult> GetById(int id)
    {
        var teamMember = await _teamRepository.GetByIdAsync(id);
        if (teamMember == null)
        {
            return NotFound();
        }
        return Ok(teamMember);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Add([FromForm] AddTeamMemberRequestDto request)
    {
        try
        {
            var newTeamMember = await _teamService.AddTeamMemberAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = newTeamMember.Id }, newTeamMember);
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "Error adding team member");
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("add-image")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddTeamMemberImage([FromForm] AddTeamMemberImageRequestDto request)
    {
        try
        {
            var teamMember = await _teamService.AddTeamMemberImageAsync(request.TeamMemberId, request.File);
            return Ok(teamMember);
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
        var result = await _teamService.DeleteTeamMemberAsync(id);
        if (result)
        {
            return Ok();
        }
        return NotFound();
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTeamMemberRequestDto request)
    {
        try
        {
            var updatedTeamMember = await _teamService.UpdateTeamMemberAsync(id, request);
            if (updatedTeamMember == null)
            {
                return NotFound();
            }
            return Ok(updatedTeamMember);
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, "Error updating team member");
            return BadRequest(ex.Message);
        }
    }
}
