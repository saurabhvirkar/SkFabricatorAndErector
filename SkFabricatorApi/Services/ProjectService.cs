using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services;

public class ProjectService : IProjectService
{
    private readonly Cloudinary _cloudinary;
    private readonly IProjectRepository _projectRepository;

    public ProjectService(IOptions<CloudinarySettings> config, IProjectRepository projectRepository)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(acc);
        _projectRepository = projectRepository;
    }

    public async Task<Project> AddProjectImageAsync(int projectId, IFormFile file)
    {
        var project = await _projectRepository.GetByIdAsync(projectId);
        if (project == null)
        {
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
            throw new System.Exception(uploadResult.Error.Message);
        }

        project.Image = uploadResult.SecureUrl.AbsoluteUri;

        return await _projectRepository.UpdateAsync(project);
    }

    public async Task<Project> AddProjectAsync(AddProjectRequestDto request)
    {
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

        return await _projectRepository.AddAsync(project);
    }

    public async Task<bool> DeleteProjectAsync(int id)
    {
        var project = await _projectRepository.GetByIdAsync(id);
        if (project == null)
        {
            return false;
        }

        if (!string.IsNullOrEmpty(project.PublicId))
        {
            var deleteParams = new DeletionParams(project.PublicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            if (result.Error != null)
            {
                // Log the error or handle it as needed
                return false;
            }
        }

        return await _projectRepository.DeleteAsync(id);
    }

    public async Task<Project> UpdateProjectAsync(Project project)
    {
        return await _projectRepository.UpdateAsync(project);
    }
}