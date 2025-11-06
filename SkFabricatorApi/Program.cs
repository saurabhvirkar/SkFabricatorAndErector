using SkFabricatorApi.StartupExtensions;
using SkFabricatorApi.Models;
using Microsoft.AspNetCore.HttpOverrides; // Added for ForwardedHeaders
// using Microsoft.AspNetCore.DataProtection; // No longer needed for free tier

var builder = WebApplication.CreateBuilder(args);

// --- Service Registration ---
builder.Services.AddPersistenceServices(builder.Configuration, builder.Environment);
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
builder.Services.AddAuthenticationAndAuthorizationServices(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));

// REMOVED: The AddDataProtection() line. We cannot use persistent disks on the free tier.
// builder.Services.AddDataProtection().PersistKeysToFileSystem(new DirectoryInfo("/app/DataProtection-Keys"));

builder.Services.AddControllers(options =>
{
    options.Filters.Add<SkFabricatorApi.Filters.ValidationFilter>();
    options.Filters.Add<SkFabricatorApi.Filters.ApiExceptionFilter>();
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerDocumentation();
builder.Services.AddCorsPolicy();

var app = builder.Build();

// --- Database Initialization ---
await app.UseDatabaseInitialization(app.Services, builder.Configuration);

// --- Middleware Pipeline Configuration ---

// Explicitly handle OPTIONS requests for CORS preflight
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.Headers.Append("Access-Control-Allow-Origin", new[] { "https://skfabricatorui.onrender.com" });
        context.Response.Headers.Append("Access-Control-Allow-Headers", new[] { "Origin, X-Requested-With, Content-Type, Accept, Authorization" });
        context.Response.Headers.Append("Access-Control-Allow-Methods", new[] { "GET, POST, PUT, DELETE, OPTIONS" });
        context.Response.Headers.Append("Access-Control-Allow-Credentials", new[] { "true" });
        context.Response.StatusCode = 200;
        return;
    }
    await next();
});

// FIX 1: Trust the Render proxy (must be high in the pipeline)
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});
app.UseCorsPolicy();

app.UseSwaggerDocumentation();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// FIX 3: Simplify app.Run(). .NET 8 handles this automatically.
app.Run();