using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Services
{
    public interface IInquiryService
    {
        Task<Inquiry> CreateInquiryAsync(Inquiry inquiry);
        Task<IEnumerable<Inquiry>> GetAllInquiriesAsync();
        Task<Inquiry?> GetInquiryByIdAsync(int id);
        Task<bool> DeleteInquiryAsync(int id);
    }
}