using SkFabricatorApi.Data;
using SkFabricatorApi.Models;


namespace SkFabricatorApi.Repositories;

public class TeamRepository(AppDbContext context) : GenericRepository<TeamMember>(context), ITeamRepository
{
}