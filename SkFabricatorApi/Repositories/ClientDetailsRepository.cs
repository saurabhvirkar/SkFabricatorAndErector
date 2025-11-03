using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Repositories;

public class ClientDetailsRepository : IClientDetailsRepository
{
    private readonly AppDbContext _context;

    public ClientDetailsRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ClientDetails>> GetAllAsync() => await _context.ClientDetails.ToListAsync();

    public async Task<ClientDetails> AddAsync(ClientDetails clientDetails)
    {
        _context.ClientDetails.Add(clientDetails);
        await _context.SaveChangesAsync();
        return clientDetails;
    }

    public async Task<ClientDetails?> GetByIdAsync(int id)
    {
        return await _context.ClientDetails.FindAsync(id);
    }

    public async Task UpdateAsync(ClientDetails clientDetails)
    {
        _context.Entry(clientDetails).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var clientDetails = await _context.ClientDetails.FindAsync(id);
        if (clientDetails == null)
        {
            return false;
        }

        _context.ClientDetails.Remove(clientDetails);
        await _context.SaveChangesAsync();
        return true;
    }
}