using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/team")]
public class TeamController(ITeamRepository teamRepository, ITeamService teamService) : ControllerBase
{
    private readonly ITeamRepository _teamRepository = teamRepository;
    private readonly ITeamService _teamService = teamService;

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
        var newTeamMember = await _teamService.AddTeamMemberAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = newTeamMember.Id }, newTeamMember);
    }

    [HttpPost("add-image")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddTeamMemberImage([FromForm] AddTeamMemberImageRequestDto request)
    {
        var teamMember = await _teamService.AddTeamMemberImageAsync(request.TeamMemberId, request.File);
        return Ok(teamMember);
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
        var updatedTeamMember = await _teamService.UpdateTeamMemberAsync(id, request);
        if (updatedTeamMember == null)
        {
            return NotFound();
        }
        return Ok(updatedTeamMember);
    }
}
