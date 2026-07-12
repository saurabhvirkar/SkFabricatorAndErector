using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SkFabricator.Infrastructure.Persistence;
using SkFabricator.Infrastructure.Configurations;
using SkFabricator.Application.Common.Interfaces;
using SkFabricator.Infrastructure.Common;
using SkFabricator.Infrastructure.Persistence.Repositories;
using SkFabricator.Infrastructure.Persistence.UnitOfWork;
using SkFabricator.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using SkFabricator.Infrastructure.Persistence.DbContext;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SkFabricator.Infrastructure.JWT;
using SkFabricator.Application.Features.Authentication.Contracts;
using SkFabricator.Infrastructure.Authentication;
using SkFabricator.Infrastructure.Services;

namespace SkFabricator.Infrastructure.DependencyInjection;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Configure strongly typed settings
        services.Configure<DatabaseSettings>(configuration.GetSection(DatabaseSettings.SectionName));
        
        var jwtSettings = new JwtSettings();
        configuration.Bind(JwtSettings.SectionName, jwtSettings);
        services.AddSingleton(jwtSettings);


        // Configure DbContext
        services.AddDbContext<ApplicationDbContext>((serviceProvider, options) =>
        {
            var databaseSettings = serviceProvider.GetRequiredService<IOptions<DatabaseSettings>>().Value;
            options.UseNpgsql(databaseSettings.ConnectionString, builder =>
            {
                builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName);
                builder.EnableRetryOnFailure();
            });
        });

        services.AddIdentity<ApplicationUser, ApplicationRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(o =>
        {
            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)),
                ValidateIssuer = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidateAudience = true,
                ValidAudience = jwtSettings.Audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
        });


        // Register common services
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();


        // Register repositories and other services here in the future
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}
