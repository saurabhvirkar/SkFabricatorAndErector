using SkFabricator.Domain.Entities;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SkFabricator.Infrastructure.Persistence.Repositories
{
    public interface IGenericRepository<T> where T : BaseEntity<Guid>
    {
        IQueryable<T> GetAll();
        Task<T> GetByIdAsync(Guid id);
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<bool> ExistsAsync(Guid id);
        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
    }
}
