using System.ComponentModel.DataAnnotations;

namespace SkFabricatorApi.Models
{
    public class TeamMember
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Role { get; set; }
        [Required]
        public string ImageUrl { get; set; }
    }
}
