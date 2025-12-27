using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class HomeSliderRepository : GenericRepository<HomeSlider>, IHomeSliderRepository
{
	public HomeSliderRepository(AppDbContext context, ILogger<GenericRepository<HomeSlider>> logger)
		: base(context, logger)
	{
	}
}
