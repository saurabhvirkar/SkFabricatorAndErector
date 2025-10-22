using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Repositories
{
    public interface IInquiryRepository
    {
        Task<Inquiry> AddAsync(Inquiry inquiry);
        Task<IEnumerable<Inquiry>> GetAllAsync();
    }
}