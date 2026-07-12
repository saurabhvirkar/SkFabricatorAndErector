using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using SkFabricator.Api.Authorization;

namespace SkFabricator.Api
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPresentation(this IServiceCollection services)
        {
            services.AddSingleton<IAuthorizationHandler, PermissionHandler>();
            return services;
        }
    }
}
