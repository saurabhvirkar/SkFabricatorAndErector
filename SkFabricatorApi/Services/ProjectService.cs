using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services;

public class ProjectService : IProjectService
{
    private readonly Cloudinary _cloudinary;
    private readonly IProjectRepository _projectRepository;
    private readonly ILogger<ProjectService> _logger;

    public ProjectService(IOptions<CloudinarySettings> config, IProjectRepository projectRepository, ILogger<ProjectService> logger)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(acc);
        _projectRepository = projectRepository;
        _logger = logger;
    }

    public async Task<Project> AddProjectImageAsync(int projectId, IFormFile file)
    {
        _logger.LogInformation("Adding image to project with ID {ProjectId}", projectId);
        if (file == null)
        {
            _logger.LogWarning("File is required for adding project image to project ID {ProjectId}", projectId);
            throw new ArgumentNullException(nameof(file));
        }
        var project = await _projectRepository.GetByIdAsync(projectId);
        if (project == null)
        {
            _logger.LogWarning("Project with ID {ProjectId} not found", projectId);
            throw new System.Exception("Project not found");
        }
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        if (uploadResult.Error != null)
        {
            _logger.LogError("Error uploading project image: {Error}", uploadResult.Error.Message);
            throw new System.Exception(uploadResult.Error.Message);
        }

        project.Image = uploadResult.SecureUrl.AbsoluteUri;

        await _projectRepository.UpdateAsync(project);
        _logger.LogInformation("Project image updated for project ID {ProjectId}", projectId);
        return project;
    }

    public async Task<Project> AddProjectAsync(AddProjectRequestDto request)
    {
        _logger.LogInformation("Adding new project: {Title}", request.Title);
        if (request == null)
        {
            _logger.LogWarning("Request is null for adding project");
            throw new ArgumentNullException(nameof(request));
        }
        if (request.File == null)
        {
            _logger.LogWarning("File is required for adding project {Title}", request.Title);
            throw new ArgumentNullException(nameof(request.File));
        }
        var uploadResult = new ImageUploadResult();

        if (request.File.Length > 0)
        {
            using var stream = request.File.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(request.File.FileName, stream)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        if (uploadResult.Error != null)
        {
            _logger.LogError("Error uploading project image: {Error}", uploadResult.Error.Message);
            throw new System.Exception(uploadResult.Error.Message);
        }

        var project = new Project
        {
            Title = request.Title,
            Description = request.Description,
            Category = request.Category,
            Image = uploadResult.SecureUrl.AbsoluteUri,
            PublicId = uploadResult.PublicId
        };

        await _projectRepository.AddAsync(project);
        _logger.LogInformation("Project added: {Title}", request.Title);
        return project;
    }

    public async Task<bool> DeleteProjectAsync(int id)
    {
        _logger.LogInformation("Deleting project with ID {ProjectId}", id);
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
        {
            _logger.LogWarning("Project with ID {ProjectId} not found", id);
            return false;
        }

        if (!string.IsNullOrEmpty(project.PublicId))
        {
            var deleteParams = new DeletionParams(project.PublicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            if (result.Error != null)
            {
                _logger.LogError("Error deleting project image from Cloudinary: {Error}", result.Error.Message);
                return false;
            }
        }

        await _projectRepository.DeleteAsync(project);
        _logger.LogInformation("Project deleted with ID {ProjectId}", id);
        return true;
    }

    public async Task<Project> UpdateProjectAsync(Project project)
    {
        _logger.LogInformation("Updating project with ID {ProjectId}", project.Id);
        await _projectRepository.UpdateAsync(project);
        return project;
    }
}