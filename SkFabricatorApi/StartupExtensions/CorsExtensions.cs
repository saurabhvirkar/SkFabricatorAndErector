namespace SkFabricatorApi.StartupExtensions;

public static class CorsExtensions
{
    public static IServiceCollection AddCorsPolicy(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                // This is the corrected code
                policy.WithOrigins("http://localhost:4200",
                           "https://skfabricatorui.onrender.com") // <-- Corrected URL
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
            });
        });
        return services;
    }

    public static IApplicationBuilder UseCorsPolicy(this IApplicationBuilder app)
    {
        app.UseCors();
        return app;
    }
}