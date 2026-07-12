using SkFabricator.Application.Common.Interfaces;
using SkFabricator.Domain.Entities;

namespace SkFabricator.Infrastructure.Persistence;

public class Repository<T> : IRepository<T> where T : BaseAuditableEntity
{
    // Implementation will be added in a later phase
    #region IRepository<T> Members

    public Task AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public void Delete(T entity)
    {
        throw new NotImplementedException();
    }

    public Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<T>> ListAllAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<T>> ListAsync(System.Linq.Expressions.Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public void Update(T entity)
    {
        throw new NotImplementedException();
    }

    #endregion
}
