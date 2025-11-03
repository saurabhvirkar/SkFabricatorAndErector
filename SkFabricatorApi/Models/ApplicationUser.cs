using Microsoft.AspNetCore.Identity;

namespace SkFabricatorApi.Models;

public class ApplicationUser : IdentityUser
{
    public string? Role { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
}

