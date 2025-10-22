using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkFabricatorApi.Models;
using SkFabricatorApi.Services;
using System;

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
        public async Task<IActionResult> SubmitInquiry([FromBody] Inquiry inquiry)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _inquiryService.CreateInquiryAsync(inquiry);
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                // In a real app, you would log this exception.
                return StatusCode(500, $"An internal error occurred: {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> GetInquiries()
        {
            var inquiries = await _inquiryService.GetAllInquiriesAsync();
            return Ok(inquiries);
        }
    }
}
