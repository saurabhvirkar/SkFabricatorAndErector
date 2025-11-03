using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public interface INewsletterRepository
{
    Task<IEnumerable<NewsletterSubscription>> GetAllAsync();
    Task<NewsletterSubscription> AddAsync(NewsletterSubscription subscription);
    Task<NewsletterSubscription?> GetByIdAsync(int id);
}
