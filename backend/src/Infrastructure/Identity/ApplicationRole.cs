using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SkFabricator.Infrastructure.Identity
{
    public class ApplicationRole : IdentityRole<Guid>
    {
        public string? Description { get; set; }

        [Timestamp]
        public byte[]? RowVersion { get; set; }
    }
}
