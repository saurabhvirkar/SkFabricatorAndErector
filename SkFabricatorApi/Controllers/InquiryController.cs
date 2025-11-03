using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkFabricatorApi.Models;
using SkFabricatorApi.Services;

namespace SkFabricatorApi.Controllers;

[ApiController]
[Route("api/inquiry")]
public class InquiryController : ControllerBase
{
    private readonly IInquiryService _inquiryService;

    public InquiryController(IInquiryService inquiryService)
    {
        _inquiryService = inquiryService;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> SubmitInquiryAsync([FromBody] Inquiry inquiry)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var createdInquiry = await _inquiryService.CreateInquiryAsync(inquiry);
            return CreatedAtRoute("GetInquiryByIdAsync", new { id = createdInquiry.Id }, createdInquiry);
        }
        catch (Exception)
        {
            return StatusCode(500, "An internal error occurred while processing your request.");
        }
    }


    [HttpGet]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> GetInquiriesAsync()
    {
        var inquiries = await _inquiryService.GetAllInquiriesAsync();
        return Ok(inquiries);
    }

    [HttpGet("{id}", Name = "GetInquiryByIdAsync")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> GetInquiryByIdAsync(int id)
    {
        var inquiry = await _inquiryService.GetInquiryByIdAsync(id);

        if (inquiry == null)
        {
            return NotFound();
        }

        return Ok(inquiry);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> DeleteInquiryAsync(int id)
    {
        var success = await _inquiryService.DeleteInquiryAsync(id);

        if (!success)
        {
            return NotFound($"Inquiry with ID {id} not found.");
        }

        return NoContent();
    }
}
