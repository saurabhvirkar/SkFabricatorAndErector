using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/newsletter")]
public class NewsletterController : ControllerBase
{
    private readonly INewsletterRepository _newsletterRepository;
    public NewsletterController(INewsletterRepository newsletterRepository)
    {
        _newsletterRepository = newsletterRepository;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Subscribe([FromBody] NewsletterSubscription sub)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var newSub = await _newsletterRepository.AddAsync(sub);
        return CreatedAtAction("GetNewsletterSubscriptionById", new { id = newSub.Id }, newSub);
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
