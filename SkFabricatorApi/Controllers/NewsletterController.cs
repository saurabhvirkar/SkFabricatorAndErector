using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/newsletter")]
public class NewsletterController(INewsletterRepository newsletterRepository) : ControllerBase
{
    private readonly INewsletterRepository _newsletterRepository = newsletterRepository;

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Subscribe([FromBody] NewsletterSubscription sub)
    {
        await _newsletterRepository.AddAsync(sub);
        await _newsletterRepository.SaveChangesAsync();
        return CreatedAtAction("GetNewsletterSubscriptionById", new { id = sub.Id }, sub);
    }
    [HttpGet]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> GetAll()
    {
        var subs = await _newsletterRepository.GetAllAsync();
        return Ok(subs);
    }

    [HttpGet("{id}", Name = "GetNewsletterSubscriptionById")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> GetById(int id)
    {
        var sub = await _newsletterRepository.GetByIdAsync(id);
        if (sub == null)
        {
            return NotFound();
        }
        return Ok(sub);
    }
}
