using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;


namespace SkFabricatorApi.Repositories;

public class ProjectRepository(AppDbContext context) : GenericRepository<Project>(context), IProjectRepository
{
}