using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Repositories
{
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
    }
}
