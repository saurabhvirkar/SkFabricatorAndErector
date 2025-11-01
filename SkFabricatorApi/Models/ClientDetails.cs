using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models
{
    public class ClientDetails
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? ImageUrl { get; set; }
    }
}
