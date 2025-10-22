using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SkFabricatorApi.Services
{
    public class InquiryService : IInquiryService
    {
        private readonly IInquiryRepository _inquiryRepository;
        private readonly IConfiguration _config;

        public InquiryService(IInquiryRepository inquiryRepository, IConfiguration config)
        {
            _inquiryRepository = inquiryRepository;
            _config = config;
        }

        public async Task<Inquiry> CreateInquiryAsync(Inquiry inquiry)
        {
            var newInquiry = await _inquiryRepository.AddAsync(inquiry);
            await SendEmailAsync(newInquiry);
            return newInquiry;
        }

        public async Task<IEnumerable<Inquiry>> GetAllInquiriesAsync()
        {
            return await _inquiryRepository.GetAllAsync();
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
            await client.ConnectAsync(_config["Email:SmtpServer"], int.Parse(_config["Email:SmtpPort"]!), MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_config["Email:Username"], _config["Email:Password"]);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}