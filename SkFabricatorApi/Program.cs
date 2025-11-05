using SkFabricatorApi.StartupExtensions;
using SkFabricatorApi.Models;

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

app.UseHttpsRedirection();
app.UseMiddleware<SkFabricatorApi.Middleware.ErrorHandlingMiddleware>();
app.UseCorsPolicy();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();