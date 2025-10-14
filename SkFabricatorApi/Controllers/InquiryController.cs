using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MailKit.Net.Smtp;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InquiryController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public InquiryController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> SubmitInquiry([FromBody] Inquiry inquiry)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Save inquiry in DB
            _context.Inquiries.Add(inquiry);
            await _context.SaveChangesAsync();

            try
            {
                await SendEmailAsync(inquiry);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error sending email: {ex.Message}");
            }

            return Ok(new { success = true });
        }

        private async Task SendEmailAsync(Inquiry inquiry)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("SK Fabricator Site", _config["Email:From"]));
            message.To.Add(new MailboxAddress("Admin", _config["Email:To"]));
            message.Subject = $"New Inquiry from {inquiry.Name}";

            message.Body = new TextPart("plain")
            {
                Text = $@"📩 New Inquiry Received:

Name: {inquiry.Name}
Email: {inquiry.Email}
Phone: {inquiry.Phone ?? "N/A"}
Subject: {inquiry.Subject ?? "N/A"}
Category: {inquiry.Category ?? "N/A"}
Preferred Contact: {inquiry.PreferredContact ?? "N/A"}
Message:
{inquiry.Message}

Submitted At: {inquiry.SubmittedAt:yyyy-MM-dd HH:mm:ss}"
            };

            using var client = new SmtpClient();
            await client.ConnectAsync(_config["Email:SmtpServer"], int.Parse(_config["Email:SmtpPort"]!), false);
            await client.AuthenticateAsync(_config["Email:Username"], _config["Email:Password"]);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        [HttpGet]
        public async Task<IActionResult> GetInquiries()
        {
            var inquiries = await _context.Inquiries
                .OrderByDescending(i => i.SubmittedAt)
                .ToListAsync();
            return Ok(inquiries);
        }
    }
}
