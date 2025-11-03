using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories
{
    public interface ISectionImageRepository
    {
        Task<SectionImage> AddSectionImageAsync(SectionImage sectionImage);
        Task<bool> DeleteSectionImageAsync(int id);
        Task<SectionImage?> GetSectionImageByIdAsync(int id);
        Task<IEnumerable<SectionImage>> GetSectionImagesBySectionNameAsync(string sectionName);
        Task<IEnumerable<SectionImage>> GetAllSectionImagesAsync();
    }
}