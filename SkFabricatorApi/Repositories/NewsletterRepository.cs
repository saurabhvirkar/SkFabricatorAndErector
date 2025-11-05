using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;


namespace SkFabricatorApi.Repositories;

public class NewsletterRepository(AppDbContext context) : GenericRepository<NewsletterSubscription>(context), INewsletterRepository
{
    public new async Task<IEnumerable<NewsletterSubscription>> GetAllAsync()
    {
        return await _context.NewsletterSubscriptions.OrderByDescending(s => s.SubscribedAt).ToListAsync();
    }
}
