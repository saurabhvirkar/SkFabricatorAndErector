using Microsoft.Extensions.Logging;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class TeamRepository : GenericRepository<TeamMember>, ITeamRepository
{
	public TeamRepository(AppDbContext context, ILogger<GenericRepository<TeamMember>> logger)
		: base(context, logger)
	{
	}
}