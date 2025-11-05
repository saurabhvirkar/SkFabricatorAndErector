using SkFabricatorApi.Data;
using SkFabricatorApi.Models;


namespace SkFabricatorApi.Repositories;

public class OurServiceRepository(AppDbContext context) : GenericRepository<OurService>(context), IOurServiceRepository
{
}
