using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using SkFabricator.Application.Common.Interfaces;
using SkFabricator.Domain.Entities;
using SkFabricator.Infrastructure.Authentication;
using SkFabricator.Infrastructure.Persistence;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace SkFabricator.Infrastructure.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
    {
        services.AddPersistenceServices(configuration, environment);
        services.AddAuthenticationAndAuthorizationServices(configuration);
        
        // Register other infrastructure services here
        services.AddScoped<IDateTimeProvider, DateTimeProvider>();
        
        return services;
    }

    private static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
    {
        services.AddDbContext<AppDbContext>(options =>
        {
            if (environment.IsDevelopment())
            {
                options.UseSqlite(configuration.GetConnectionString("SqliteConnection"));
            }
            else
            {
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
            }
        });

        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

        services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }


    private static IServiceCollection AddAuthenticationAndAuthorizationServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Prevents mapping of claims like "sub" to long SOAP/XML types
        JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

        services.Configure<JwtSettings>(configuration.GetSection("Jwt"));
        var jwtSettings = configuration.GetSection("Jwt").Get<JwtSettings>();
        var key = Encoding.ASCII.GetBytes(jwtSettings!.Key);

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };
        });

        services.AddAuthorization(options =>
        {
            options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
            options.AddPolicy("Manager", policy => policy.RequireRole("Manager"));
        });

        return services;
    }
}
