using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkFabricatorApi.Models;
using SkFabricatorApi.Services;

namespace SkFabricatorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
                return CreatedAtAction(nameof(GetInquiryByIdAsync), new { id = createdInquiry.Id }, createdInquiry);
            }
            catch (Exception) // Consider creating a specific exception type for email failures
            {
                // In a real app, you would log this exception with a proper logging framework.
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

            return NoContent(); // Standard response for a successful DELETE
        }
    }
}
