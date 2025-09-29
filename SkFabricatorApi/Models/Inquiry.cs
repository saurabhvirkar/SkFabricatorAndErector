using System;
using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models
{
    public class Inquiry
    {
        public int Id { get; set; }
        [Required]
    public string? Name { get; set; }
        [Required]
    public string? Email { get; set; }
        [Required]
    public string? Message { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
