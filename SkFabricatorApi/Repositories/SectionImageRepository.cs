using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class SectionImageRepository : ISectionImageRepository
{
    private readonly AppDbContext _context;

    public SectionImageRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<SectionImage> AddSectionImageAsync(SectionImage sectionImage)
    {
        _context.SectionImages.Add(sectionImage);
        await _context.SaveChangesAsync();
        return sectionImage;
    }

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

    public async Task<SectionImage?> GetSectionImageByIdAsync(int id)
    {
        return await _context.SectionImages.FindAsync(id);
    }

    public async Task<IEnumerable<SectionImage>> GetSectionImagesBySectionNameAsync(string sectionName)
    {
        return await _context.SectionImages.Where(si => si.SectionName == sectionName).ToListAsync();
    }

    public async Task<IEnumerable<SectionImage>> GetAllSectionImagesAsync()
    {
        return await _context.SectionImages.ToListAsync();
    }
}