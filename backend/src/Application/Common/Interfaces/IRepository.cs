using SkFabricator.Domain.Entities;
using System.Linq.Expressions;

namespace SkFabricator.Application.Common.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IRepository<T> Repository<T>() where T : BaseAuditableEntity;

    Task<int> Complete(CancellationToken cancellationToken = default);
}

public interface IRepository<T> : IReadRepository<T> where T : BaseAuditableEntity
{
    Task AddAsync(T entity, CancellationToken cancellationToken = default);
    void Update(T entity);
    void Delete(T entity);
}

public interface IReadRepository<T> where T : BaseAuditableEntity
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<T>> ListAllAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyList<T>> ListAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default);
}
