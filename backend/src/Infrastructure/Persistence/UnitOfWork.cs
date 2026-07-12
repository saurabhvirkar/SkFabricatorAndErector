using SkFabricator.Application.Common.Interfaces;

namespace SkFabricator.Infrastructure.Persistence;

public class UnitOfWork : IUnitOfWork
{
    public Task<int> Complete(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public void Dispose()
    {
        // Nothing to dispose
    }

    public IRepository<T> Repository<T>() where T : Domain.Entities.BaseAuditableEntity
    {
        throw new NotImplementedException();
    }
}
