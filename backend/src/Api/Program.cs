using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Serilog;
using SkFabricator.Api.Configurations;
using SkFabricator.Api.Middleware;
using SkFabricator.Api.Swagger;
using SkFabricator.Application.DependencyInjection;
using SkFabricator.Infrastructure.DependencyInjection;
using SkFabricator.Api;
using Api.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
builder.Host.UseSerilog((context, configuration) => 
    configuration.ReadFrom.Configuration(context.Configuration));

// Add services to the container.
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration, builder.Environment);
builder.Services.AddPresentation();
builder.Services.AddCorsPolicy();
builder.Services.AddSwaggerDocumentation();


var connectionString = builder.Configuration.GetValue<string>("Database:ConnectionString");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Database connection string is not configured.");
}

builder.Services.AddHealthChecks()
    .AddNpgsql(connectionString, name: "PostgreSQL");




var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSerilogRequestLogging();
app.UseGlobalExceptionHandling();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation();
}

app.UseHttpsRedirection();

app.UseCorsPolicy();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHealthChecks("/health");

app.Run();
