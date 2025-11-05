using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories
{
    public interface ISectionImageRepository : IGenericRepository<SectionImage>
    {
        Task<bool> DeleteSectionImageAsync(int id);
        Task<IEnumerable<SectionImage>> GetSectionImagesBySectionNameAsync(string sectionName);
    }}