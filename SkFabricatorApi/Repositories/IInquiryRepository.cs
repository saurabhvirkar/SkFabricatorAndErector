using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public interface IInquiryRepository
{
    Task<Inquiry> AddAsync(Inquiry inquiry);
    Task<IEnumerable<Inquiry>> GetAllAsync();
    Task<Inquiry?> GetByIdAsync(int id);
    Task DeleteAsync(Inquiry inquiry);
}
