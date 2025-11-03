namespace SkFabricatorApi.Models.DTOs
{
    public class AddClientImageRequestDto
    {
        public int ClientId { get; set; }
        public IFormFile? File { get; set; }
    }
}
