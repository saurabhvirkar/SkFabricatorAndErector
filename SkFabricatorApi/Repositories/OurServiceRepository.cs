using Microsoft.Extensions.Logging;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class OurServiceRepository : GenericRepository<OurService>, IOurServiceRepository
{
	public OurServiceRepository(AppDbContext context, ILogger<GenericRepository<OurService>> logger)
		: base(context, logger)
	{
	}
}
