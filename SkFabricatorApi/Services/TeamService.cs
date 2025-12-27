using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;
using SkFabricatorApi.Models.DTOs;

namespace SkFabricatorApi.Services;

public class TeamService : ITeamService
{
    private readonly Cloudinary _cloudinary;
    private readonly ITeamRepository _teamRepository;
    private readonly ILogger<TeamService> _logger;

    public TeamService(IOptions<CloudinarySettings> config, ITeamRepository teamRepository, ILogger<TeamService> logger)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(acc);
        _teamRepository = teamRepository;
        _logger = logger;
    }

    public async Task<TeamMember> AddTeamMemberImageAsync(int teamMemberId, IFormFile file)
    {
        var teamMember = await _teamRepository.GetByIdAsync(teamMemberId) ?? throw new System.Exception("Team member not found");
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        if (uploadResult.Error != null)
        {
            throw new System.Exception(uploadResult.Error.Message);
        }

        teamMember.ImageUrl = uploadResult.SecureUrl.AbsoluteUri;

        await _teamRepository.UpdateAsync(teamMember);
        return teamMember;
    }

    public async Task<TeamMember> AddTeamMemberAsync(AddTeamMemberRequestDto request)
    {
        var uploadResult = new ImageUploadResult();

        if (request.File.Length > 0)
        {
            using var stream = request.File.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(request.File.FileName, stream)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        if (uploadResult.Error != null)
        {
            throw new System.Exception(uploadResult.Error.Message);
        }

        var teamMember = new TeamMember
        {
            Name = request.Name,
            Role = request.Role,
            ImageUrl = uploadResult.SecureUrl.AbsoluteUri,
            PublicId = uploadResult.PublicId,
            Email = request.Email,
            LinkedInUrl = request.LinkedInUrl,
            Details = request.Details
        };

        await _teamRepository.AddAsync(teamMember);
        return teamMember;
    }

    public async Task<bool> DeleteTeamMemberAsync(int id)
    {
        var teamMember = await _teamRepository.GetByIdAsync(id);
        if (teamMember == null)
        {
            return false;
        }

        if (!string.IsNullOrEmpty(teamMember.PublicId))
        {
            var deleteParams = new DeletionParams(teamMember.PublicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            if (result.Error != null)
            {
                // Log the error or handle it as needed
                return false;
            }
        }

        await _teamRepository.DeleteAsync(teamMember);
        return true;
    }

    public async Task<TeamMember?> UpdateTeamMemberAsync(int id, UpdateTeamMemberRequestDto request)
    {
        var teamMember = await _teamRepository.GetByIdAsync(id);
        if (teamMember == null)
        {
            return null;
        }

        teamMember.Name = request.Name;
        teamMember.Role = request.Role;
        teamMember.Email = request.Email;
        teamMember.LinkedInUrl = request.LinkedInUrl;
        teamMember.Details = request.Details;

        await _teamRepository.UpdateAsync(teamMember);
        return teamMember;
    }
}