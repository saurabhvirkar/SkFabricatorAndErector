using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Services
{
    public interface ISectionImageService
    {
        Task<SectionImage> AddSectionImageAsync(IFormFile file, string sectionName);
        Task<bool> DeleteSectionImageAsync(int id);
        Task<IEnumerable<SectionImage>> GetSectionImagesBySectionNameAsync(string sectionName);
        Task<IEnumerable<SectionImage>> GetAllSectionImagesAsync();
    }
}
