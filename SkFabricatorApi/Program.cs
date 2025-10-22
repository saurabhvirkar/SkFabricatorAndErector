using SkFabricatorApi.Data;
using SkFabricatorApi.Extensions;
using SkFabricatorApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// --- Service Registration ---

// Add persistence services (DbContext, Identity)
builder.Services.AddPersistenceServices(builder.Configuration);
// Configure JWT Settings
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
// Add authentication and authorization services (JWT, Policies)
builder.Services.AddAuthenticationAndAuthorizationServices(builder.Configuration);
// Add custom application services (Repositories, etc.)
builder.Services.AddApplicationServices();
// Add framework services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "SkFabricator API", Version = "v1" });

    // Define the Bearer token security scheme
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme { Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" } },
            new string[] {}
        }
    });
});

builder.Services.AddCors(options => options.AddDefaultPolicy(policy => 
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// --- Database Initialization ---
// This block ensures the database is created, migrated, and seeded on startup.
// It's placed here to run before the request pipeline is configured.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        // This will create the database and apply migrations if they haven't been applied yet
        await context.Database.MigrateAsync();
        logger.LogInformation("Database migrations applied successfully.");

        await SeedData.InitializeAsync(services, builder.Configuration);
        logger.LogInformation("Database seeded successfully.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while migrating or seeding the DB.");
    }
}

// --- Middleware Pipeline Configuration ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();