using SkFabricatorApi.Models;

namespace SkFabricatorApi.Services;

public interface ISectionImageService
{
    Task<SectionImage> AddSectionImageAsync(IFormFile file, string sectionName);
    Task<bool> DeleteSectionImageAsync(int id);
    Task<IEnumerable<SectionImage>> GetSectionImagesBySectionNameAsync(string sectionName);
    Task<IEnumerable<SectionImage>> GetAllSectionImagesAsync();
}
