using Microsoft.AspNetCore.Identity;

namespace SkFabricatorApi.Models
{
    public class ApplicationUser : IdentityUser
    {
    public string? Role { get; set; } // "Admin" or "Manager"
    }
}
