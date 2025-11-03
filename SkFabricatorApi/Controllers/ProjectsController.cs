using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectRepository _projectRepository;
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectRepository projectRepository, IProjectService projectService)
    {
        _projectRepository = projectRepository;
        _projectService = projectService;
    }

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
        try
        {
            var newProject = await _projectService.AddProjectAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = newProject.Id }, newProject);
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("add-image")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> AddProjectImage([FromForm] AddProjectImageRequestDto request)
    {
        try
        {
            var project = await _projectService.AddProjectImageAsync(request.ProjectId, request.File);
            return Ok(project);
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

        try
        {
            var updatedProject = await _projectService.UpdateProjectAsync(project);
            return Ok(updatedProject);
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

