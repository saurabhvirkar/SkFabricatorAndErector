using SkFabricator.Domain.Entities;
using SkFabricator.Infrastructure.Persistence.Repositories;
using System;
using System.Threading.Tasks;

namespace SkFabricator.Infrastructure.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<T> Repository<T>() where T : BaseEntity<Guid>;
        Task<int> CompleteAsync();
    }
}
