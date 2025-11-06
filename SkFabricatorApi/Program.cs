using SkFabricatorApi.StartupExtensions;
using SkFabricatorApi.Models;
using Microsoft.AspNetCore.HttpOverrides; // Added for ForwardedHeaders
// using Microsoft.AspNetCore.DataProtection; // No longer needed for free tier

var builder = WebApplication.CreateBuilder(args);

// --- Service Registration ---
builder.Services.AddPersistenceServices(builder.Configuration);
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

// FIX 1: Trust the Render proxy (must be high in the pipeline)
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation();
}

// FIX 2: REMOVE app.UseHttpsRedirection(); It is not needed on Render.
// app.UseHttpsRedirection(); 

app.UseMiddleware<SkFabricatorApi.Middleware.ErrorHandlingMiddleware>();
app.UseCorsPolicy();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// FIX 3: Simplify app.Run(). .NET 8 handles this automatically.
app.Run();