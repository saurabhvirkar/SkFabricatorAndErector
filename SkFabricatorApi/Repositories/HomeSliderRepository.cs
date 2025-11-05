using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;


namespace SkFabricatorApi.Repositories;

public class HomeSliderRepository(AppDbContext context) : GenericRepository<HomeSlider>(context), IHomeSliderRepository
{
}
