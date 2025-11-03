using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public interface ITeamRepository
{
    Task<IEnumerable<TeamMember>> GetAllAsync();
    Task<TeamMember> AddAsync(TeamMember teamMember);
    Task<TeamMember> UpdateAsync(TeamMember teamMember);
    Task<TeamMember?> GetByIdAsync(int id);
    Task<bool> DeleteAsync(int id);
}