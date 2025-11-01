using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;

namespace SkFabricatorApi.StartupExtensions
{
    public static class DatabaseExtensions
    {
        public static async Task UseDatabaseInitialization(this IApplicationBuilder app, IServiceProvider services, IConfiguration configuration)
        {
            using (var scope = services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                var logger = serviceProvider.GetRequiredService<ILogger<Program>>();
                try
                {
                    var context = serviceProvider.GetRequiredService<AppDbContext>();
                    await context.Database.MigrateAsync();
                    logger.LogInformation("Database migrations applied successfully.");

                    await SeedData.InitializeAsync(serviceProvider, configuration);
                    logger.LogInformation("Database seeded successfully.");
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred while migrating or seeding the DB.");
                }
            }
        }
    }
}
