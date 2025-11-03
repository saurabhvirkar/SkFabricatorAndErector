using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public interface IProjectRepository
{
    Task<IEnumerable<Project>> GetAllAsync();
    Task<Project> AddAsync(Project project);
    Task<Project> UpdateAsync(Project project);
    Task<Project?> GetByIdAsync(int id);
    Task<bool> DeleteAsync(int id);
}