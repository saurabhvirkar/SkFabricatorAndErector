using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class InquiryRepository : GenericRepository<Inquiry>, IInquiryRepository
{
    private new readonly ILogger<InquiryRepository> _logger;

    public InquiryRepository(AppDbContext context, ILogger<GenericRepository<Inquiry>> baseLogger, ILogger<InquiryRepository> logger)
        : base(context, baseLogger)
    {
        _logger = logger;
    }

    public new async Task<IEnumerable<Inquiry>> GetAllAsync()
    {
        _logger.LogInformation("Getting all inquiries ordered by SubmittedAt");
        return await _context.Inquiries
            .OrderByDescending(i => i.SubmittedAt)
            .ToListAsync();
    }
}
