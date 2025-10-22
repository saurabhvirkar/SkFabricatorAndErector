using Microsoft.AspNetCore.Identity;

namespace SkFabricatorApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Add this property to store the user's primary role
        public string? Role { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
