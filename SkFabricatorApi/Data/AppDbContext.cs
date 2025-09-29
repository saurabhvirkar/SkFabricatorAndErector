using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Inquiry> Inquiries { get; set; }
    public DbSet<NewsletterSubscription> NewsletterSubscriptions { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Service> Services { get; set; }
    }
}
