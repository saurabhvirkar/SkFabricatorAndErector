using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class ClientDetailsRepository : GenericRepository<ClientDetails>, IClientDetailsRepository
{
	public ClientDetailsRepository(AppDbContext context, ILogger<GenericRepository<ClientDetails>> logger)
		: base(context, logger)
	{
	}
}