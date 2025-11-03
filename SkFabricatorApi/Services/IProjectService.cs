using Microsoft.AspNetCore.Http;
using SkFabricatorApi.Models;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services
{
    public interface IProjectService
    {
        Task<Project> AddProjectImageAsync(int projectId, IFormFile file);
        Task<Project> AddProjectAsync(AddProjectRequestDto request);
        Task<bool> DeleteProjectAsync(int id);
        Task<Project> UpdateProjectAsync(Project project);
    }
}
