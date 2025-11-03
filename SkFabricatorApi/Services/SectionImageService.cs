using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using SkFabricatorApi.Models;
using SkFabricatorApi.Repositories;


namespace SkFabricatorApi.Services;

public class SectionImageService : ISectionImageService
{
    private readonly Cloudinary _cloudinary;
    private readonly ISectionImageRepository _sectionImageRepository;

    public SectionImageService(IOptions<CloudinarySettings> config, ISectionImageRepository sectionImageRepository)
    {
        var acc = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(acc);
        _sectionImageRepository = sectionImageRepository;
    }

    public async Task<SectionImage> AddSectionImageAsync(IFormFile file, string sectionName)
    {
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

        var sectionImage = new SectionImage
        {
            Url = uploadResult.SecureUrl.AbsoluteUri,
            PublicId = uploadResult.PublicId,
            SectionName = sectionName
        };

        return await _sectionImageRepository.AddSectionImageAsync(sectionImage);
    }

    public async Task<bool> DeleteSectionImageAsync(int id)
    {
        var sectionImage = await _sectionImageRepository.GetSectionImageByIdAsync(id);

        if (sectionImage == null)
        {
            return false;
        }

        if (!string.IsNullOrEmpty(sectionImage.PublicId))
        {
            var deleteParams = new DeletionParams(sectionImage.PublicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            if (result.Error != null)
            {
                // Log the error or handle it as needed
                return false;
            }
        }

        return await _sectionImageRepository.DeleteSectionImageAsync(id);
    }

    public async Task<IEnumerable<SectionImage>> GetSectionImagesBySectionNameAsync(string sectionName)
    {
        return await _sectionImageRepository.GetSectionImagesBySectionNameAsync(sectionName);
    }

    public async Task<IEnumerable<SectionImage>> GetAllSectionImagesAsync()
    {
        return await _sectionImageRepository.GetAllSectionImagesAsync();
    }
}