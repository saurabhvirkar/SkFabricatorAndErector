namespace SkFabricatorApi.Models.DTOs;

public class UpdateTeamMemberRequestDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Role { get; set; }
    public string? Email { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? Details { get; set; }
}
