using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectRepository _projectRepository;
    public ProjectsController(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
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
    public async Task<IActionResult> Add([FromBody] Project project)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var newProject = await _projectRepository.AddAsync(project);
        return CreatedAtAction("GetProjectById", new { id = newProject.Id }, newProject);
    }
}

