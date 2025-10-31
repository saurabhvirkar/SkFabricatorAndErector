using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SkFabricatorApi.Repositories
{
    public class NewsletterRepository : INewsletterRepository
    {
        private readonly AppDbContext _context;

        public NewsletterRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<NewsletterSubscription>> GetAllAsync() => 
            await _context.NewsletterSubscriptions.OrderByDescending(s => s.SubscribedAt).ToListAsync();

        public async Task<NewsletterSubscription> AddAsync(NewsletterSubscription subscription)
        {
            _context.NewsletterSubscriptions.Add(subscription);
            await _context.SaveChangesAsync();
            return subscription;
        }

        public async Task<NewsletterSubscription?> GetByIdAsync(int id)
        {
            return await _context.NewsletterSubscriptions.FindAsync(id);
        }
    }
}