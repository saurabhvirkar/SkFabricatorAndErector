using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Repositories
{
    public interface ITeamRepository
    {
        Task<IEnumerable<TeamMember>> GetAllAsync();
        Task<TeamMember> AddAsync(TeamMember teamMember);
        Task<TeamMember?> GetByIdAsync(int id);
    }
}
