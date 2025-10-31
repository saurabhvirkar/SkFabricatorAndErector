using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkFabricatorApi.Repositories
{
    public class InquiryRepository : IInquiryRepository
    {
        private readonly AppDbContext _context;

        public InquiryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Inquiry> AddAsync(Inquiry inquiry)
        {
            _context.Inquiries.Add(inquiry);
            await _context.SaveChangesAsync();
            return inquiry;
        }

        public async Task<IEnumerable<Inquiry>> GetAllAsync()
        {
            return await _context.Inquiries
                .OrderByDescending(i => i.SubmittedAt)
                .ToListAsync();
        }

        public async Task<Inquiry?> GetByIdAsync(int id)
        {
            return await _context.Inquiries.FindAsync(id);
        }

        public async Task DeleteAsync(Inquiry inquiry)
        {
            _context.Inquiries.Remove(inquiry);
            await _context.SaveChangesAsync();
        }
    }
}