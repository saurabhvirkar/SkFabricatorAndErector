using SkFabricator.Application.Features.Authentication.DTOs;
using System.Threading.Tasks;

namespace SkFabricator.Application.Features.Authentication.Contracts
{
    public interface IAuthenticationService
    {
        Task<AuthenticationResponse> RegisterAsync(RegisterRequest request);
        Task<AuthenticationResponse> LoginAsync(LoginRequest request);
    }
}
