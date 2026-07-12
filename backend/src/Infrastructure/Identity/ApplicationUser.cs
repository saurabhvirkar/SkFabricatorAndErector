using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SkFabricator.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool IsActive { get; set; } = true;

        [Timestamp]
        public byte[]? RowVersion { get; set; }
    }
}
