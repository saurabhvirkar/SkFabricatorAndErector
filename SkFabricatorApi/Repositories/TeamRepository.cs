using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Repositories
{
    public class TeamRepository : ITeamRepository
    {
        private readonly AppDbContext _context;

        public TeamRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TeamMember>> GetAllAsync() => await _context.TeamMembers.ToListAsync();

        public async Task<TeamMember> AddAsync(TeamMember teamMember)
        {
            _context.TeamMembers.Add(teamMember);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new System.Exception($"Database update error: {ex.InnerException?.Message ?? ex.Message}", ex);
            }
            return teamMember;
        }

        public async Task<TeamMember?> GetByIdAsync(int id)
        {
            return await _context.TeamMembers.FindAsync(id);
        }

        public async Task<TeamMember> UpdateAsync(TeamMember teamMember)
        {
            _context.Entry(teamMember).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return teamMember;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var teamMember = await _context.TeamMembers.FindAsync(id);
            if (teamMember == null)
            {
                return false;
            }

            _context.TeamMembers.Remove(teamMember);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
