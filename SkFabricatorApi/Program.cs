using SkFabricatorApi.StartupExtensions;
using SkFabricatorApi.Models;
using Microsoft.AspNetCore.HttpOverrides; // Added for ForwardedHeaders
using Microsoft.AspNetCore.DataProtection; // Added for DirectoryInfo

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
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
// Configure Data Protection to store keys in a specific directory
builder.Services.AddDataProtection().PersistKeysToFileSystem(new DirectoryInfo("/app/DataProtection-Keys"));
// Add framework services
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
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation();
}

// Configure Forwarded Headers for proxy support (Render)
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseHttpsRedirection();
app.UseMiddleware<SkFabricatorApi.Middleware.ErrorHandlingMiddleware>();
app.UseCorsPolicy();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Configure Kestrel to listen on the PORT environment variable provided by Render
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
if (app.Environment.IsDevelopment())
{
    app.Run($"http://localhost:{port}");
}
else
{
    app.Run($"http://0.0.0.0:{port}");
}