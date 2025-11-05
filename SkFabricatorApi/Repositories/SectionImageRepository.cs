using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;


namespace SkFabricatorApi.Repositories;

public class SectionImageRepository(AppDbContext context) : GenericRepository<SectionImage>(context), ISectionImageRepository
{
    public async Task<bool> DeleteSectionImageAsync(int id)
    {
        var sectionImage = await _context.SectionImages.FindAsync(id);
        if (sectionImage == null)
        {
            return false;
        }

        _context.SectionImages.Remove(sectionImage);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<SectionImage>> GetSectionImagesBySectionNameAsync(string sectionName)
    {
        return await _context.SectionImages.Where(si => si.SectionName == sectionName).ToListAsync();
    }
}