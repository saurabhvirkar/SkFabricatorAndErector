using Microsoft.AspNetCore.Http;
using SkFabricatorApi.Models;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services
{
    public interface ITeamService
    {
        Task<TeamMember> AddTeamMemberImageAsync(int teamMemberId, IFormFile file);
        Task<TeamMember> AddTeamMemberAsync(AddTeamMemberRequestDto request);
        Task<bool> DeleteTeamMemberAsync(int id);
        Task<TeamMember?> UpdateTeamMemberAsync(int id, UpdateTeamMemberRequestDto request);
    }
}
