namespace SkFabricator.Infrastructure.Authentication;

public class JwtSettings
{
    public string Key { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public double ExpireDays { get; set; }
    public int RefreshTokenExpireDays { get; set; }
}
