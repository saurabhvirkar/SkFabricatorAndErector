using System;
using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models
{
    public class NewsletterSubscription
    {
        public int Id { get; set; }
        [Required]
    public string? Email { get; set; }
        public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;
    }
}
