using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkFabricatorApi.Data;
using SkFabricatorApi.Models;
using System.Threading.Tasks;
using System.Linq;
using System;
using MailKit.Net.Smtp;
using MimeKit;

namespace SkFabricatorApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InquiryController : ControllerBase
    {
        private readonly AppDbContext _context;
        public InquiryController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> SubmitInquiry([FromBody] Inquiry inquiry)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Inquiries.Add(inquiry);
            await _context.SaveChangesAsync();

            // Send email to admin and manager
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("SK Fabricator Site", "no-reply@skfabricator.com"));
            message.To.Add(new MailboxAddress("Demo", "ssvirkar04gmail.com"));
            message.Subject = "New Inquiry Received";
            message.Body = new TextPart("plain")
            {
                Text = $"Name: {inquiry.Name}\nEmail: {inquiry.Email}\nMessage: {inquiry.Message}\nSubmitted At: {inquiry.SubmittedAt}"
            };
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.yourserver.com", 587, false);
                await client.AuthenticateAsync("your_smtp_user", "your_smtp_password");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }

            return Ok(new { success = true });
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> GetInquiries()
        {
            var inquiries = await _context.Inquiries.OrderByDescending(i => i.SubmittedAt).ToListAsync();
            return Ok(inquiries);
        }
    }
}
