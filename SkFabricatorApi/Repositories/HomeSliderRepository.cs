using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class HomeSliderRepository : IHomeSliderRepository
{
    private readonly AppDbContext _context;

    public HomeSliderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<HomeSlider>> GetAllAsync() => await _context.HomeSliders.ToListAsync();

    public async Task<HomeSlider> AddAsync(HomeSlider homeSlider)
    {
        _context.HomeSliders.Add(homeSlider);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            throw new System.Exception($"Database update error: {ex.InnerException?.Message ?? ex.Message}", ex);
        }
        return homeSlider;
    }

    public async Task<HomeSlider?> GetByIdAsync(int id)
    {
        return await _context.HomeSliders.FindAsync(id);
    }

    public async Task<HomeSlider> UpdateAsync(HomeSlider homeSlider)
    {
        _context.Entry(homeSlider).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return homeSlider;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var homeSlider = await _context.HomeSliders.FindAsync(id);
        if (homeSlider == null)
        {
            return false;
        }

        _context.HomeSliders.Remove(homeSlider);
        return await _context.SaveChangesAsync() > 0;
    }
}
