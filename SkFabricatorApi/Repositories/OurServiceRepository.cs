using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class OurServiceRepository : IOurServiceRepository
{
    private readonly AppDbContext _context;

    public OurServiceRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OurService>> GetAllAsync() => await _context.OurServices.ToListAsync();

    public async Task<OurService> AddAsync(OurService service)
    {
        _context.OurServices.Add(service);
        await _context.SaveChangesAsync();
        return service;
    }

    public async Task<OurService?> GetByIdAsync(int id)
    {
        return await _context.OurServices.FindAsync(id);
    }

    public async Task<OurService> UpdateAsync(OurService service)
    {
        _context.Entry(service).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return service;
    }

    public async Task DeleteAsync(int id)
    {
        var service = await _context.OurServices.FindAsync(id);
        if (service != null)
        {
            _context.OurServices.Remove(service);
            await _context.SaveChangesAsync();
        }
    }
}
