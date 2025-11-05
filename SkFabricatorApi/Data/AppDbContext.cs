using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<Inquiry> Inquiries { get; set; }
    public DbSet<NewsletterSubscription> NewsletterSubscriptions { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<OurService> OurServices { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<SectionImage> SectionImages { get; set; }
    public DbSet<TeamMember> TeamMembers { get; set; }
    public DbSet<ClientDetails> ClientDetails { get; set; }
    public DbSet<HomeSlider> HomeSliders { get; set; }
}