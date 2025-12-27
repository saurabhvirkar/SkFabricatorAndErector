
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SkFabricatorApi.Data;
using System.Linq.Expressions;

namespace SkFabricatorApi.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly AppDbContext _context;
    protected readonly ILogger<GenericRepository<T>>? _logger;

    public GenericRepository(AppDbContext context, ILogger<GenericRepository<T>>? logger = null)
    {
        _context = context;
        _logger = logger;
    }

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
        _logger?.LogInformation("Getting all entities of type {EntityType}", typeof(T).Name);
        return await _context.Set<T>().ToListAsync();
    }

    public virtual async Task<T?> GetByIdAsync(int id)
    {
        _logger?.LogInformation("Getting entity of type {EntityType} with id {Id}", typeof(T).Name, id);
        return await _context.Set<T>().FindAsync(id);
    }

    public virtual async Task AddAsync(T entity)
    {
        if (entity == null)
        {
            _logger?.LogWarning("Attempted to add null entity of type {EntityType}", typeof(T).Name);
            throw new ArgumentNullException(nameof(entity));
        }
        _logger?.LogInformation("Adding entity of type {EntityType}", typeof(T).Name);
        await _context.Set<T>().AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public virtual async Task UpdateAsync(T entity)
    {
        if (entity == null)
        {
            _logger?.LogWarning("Attempted to update null entity of type {EntityType}", typeof(T).Name);
            throw new ArgumentNullException(nameof(entity));
        }
        _logger?.LogInformation("Updating entity of type {EntityType}", typeof(T).Name);
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public virtual async Task DeleteAsync(T entity)
    {
        if (entity == null)
        {
            _logger?.LogWarning("Attempted to delete null entity of type {EntityType}", typeof(T).Name);
            throw new ArgumentNullException(nameof(entity));
        }
        _logger?.LogInformation("Deleting entity of type {EntityType}", typeof(T).Name);
        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
    }

    public virtual async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        _logger?.LogInformation("Finding entities of type {EntityType} with predicate", typeof(T).Name);
        return await _context.Set<T>().Where(predicate).ToListAsync();
    }

    public virtual async Task<int> SaveChangesAsync()
    {
        _logger?.LogInformation("Saving changes for {EntityType}", typeof(T).Name);
        return await _context.SaveChangesAsync();
    }
}
