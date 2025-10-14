using System;
using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models
{
    public class Inquiry
    {   
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [Phone, MaxLength(20)]
    public string? Phone { get; set; }

    [MaxLength(100)]
    public string? Subject { get; set; }

    [MaxLength(50)]
    public string? Category { get; set; }

    [MaxLength(50)]
    public string? PreferredContact { get; set; }

    [Required, MaxLength(2000)]
    public string Message { get; set; } = string.Empty;

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
