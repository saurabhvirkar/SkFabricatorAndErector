namespace SkFabricator.Infrastructure.JWT
{
    public class JwtSettings
    {
        public const string SectionName = "Jwt";
        public string Key { get; init; } = null!;
        public string Issuer { get; init; } = null!;
        public string Audience { get; init; } = null!;
        public int ExpiryMinutes { get; init; }
    }
}
