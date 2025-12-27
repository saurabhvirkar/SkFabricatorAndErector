using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class ProjectRepository : GenericRepository<Project>, IProjectRepository
{
	public ProjectRepository(AppDbContext context, ILogger<GenericRepository<Project>> logger)
		: base(context, logger)
	{
	}
}