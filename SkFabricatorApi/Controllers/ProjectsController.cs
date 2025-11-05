using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectsController(IProjectRepository projectRepository, IProjectService projectService) : ControllerBase
{
    private readonly IProjectRepository _projectRepository = projectRepository;
    private readonly IProjectService _projectService = projectService;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var projects = await _projectRepository.GetAllAsync();
        return Ok(projects);
    }

    [HttpGet("{id}", Name = "GetProjectById")]
    public async Task<IActionResult> GetById(int id)
    {
        // This assumes your repository can fetch by ID.
        // We will need to add GetByIdAsync to IProjectRepository and ProjectRepository.
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
        {
            return NotFound();
        }
        return Ok(project);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Add([FromForm] AddProjectRequestDto request)
    {
        var newProject = await _projectService.AddProjectAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = newProject.Id }, newProject);
    }

    [HttpPost("add-image")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddProjectImage([FromForm] AddProjectImageRequestDto request)
    {
        var project = await _projectService.AddProjectImageAsync(request.ProjectId, request.File);
        return Ok(project);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _projectService.DeleteProjectAsync(id);
        if (result)
        {
            return Ok();
        }
        return NotFound();
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(int id, [FromBody] Project project)
    {
        if (id != project.Id)
        {
            return BadRequest();
        }

        var updatedProject = await _projectService.UpdateProjectAsync(project);
        return Ok(updatedProject);
    }
}

