using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace SkFabricatorApi.StartupExtensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

        return services;
    }

    public static IServiceCollection AddAuthenticationAndAuthorizationServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Prevents mapping of claims like "sub" to long SOAP/XML types
        JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

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

    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IInquiryRepository, InquiryRepository>();
        services.AddScoped<IInquiryService, InquiryService>();
        services.AddScoped<IProjectRepository, ProjectRepository>(); // Already present, but good to confirm
        services.AddScoped<IProjectService, ProjectService>();
        services.AddScoped<IOurServiceRepository, OurServiceRepository>(); // Already present, but good to confirm
        services.AddScoped<IOurServiceService, OurServiceService>();
        services.AddScoped<INewsletterRepository, NewsletterRepository>(); // Already present, but good to confirm
        services.AddScoped<IPhotoRepository, PhotoRepository>();
        services.AddScoped<IPhotoService, PhotoService>();
        services.AddScoped<ISectionImageRepository, SectionImageRepository>();
        services.AddScoped<ISectionImageService, SectionImageService>();
        services.AddScoped<ITeamRepository, TeamRepository>();
        services.AddScoped<ITeamService, TeamService>();
        services.AddScoped<IClientDetailsRepository, ClientDetailsRepository>();
        services.AddScoped<IClientService, ClientService>();
        services.AddScoped<IHomeSliderRepository, HomeSliderRepository>();
        services.AddScoped<IHomeSliderService, HomeSliderService>();
        return services;
    }
}