using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;


namespace SkFabricatorApi.Repositories;

public class ClientDetailsRepository(AppDbContext context) : GenericRepository<ClientDetails>(context), IClientDetailsRepository
{
}