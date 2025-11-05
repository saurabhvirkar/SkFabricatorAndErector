using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;


namespace SkFabricatorApi.Repositories;

public class InquiryRepository(AppDbContext context) : GenericRepository<Inquiry>(context), IInquiryRepository
{
    public new async Task<IEnumerable<Inquiry>> GetAllAsync()
    {
        return await _context.Inquiries
            .OrderByDescending(i => i.SubmittedAt)
            .ToListAsync();
    }
}
