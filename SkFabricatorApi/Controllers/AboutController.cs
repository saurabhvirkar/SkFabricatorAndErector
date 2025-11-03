using Microsoft.AspNetCore.Mvc;
using SkFabricatorApi.Services;
using System.Threading.Tasks;
using System.Collections.Generic;
using SkFabricatorApi.Models;

namespace SkFabricatorApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        private readonly IPhotoService _photoService;

        public AboutController(IPhotoService photoService)
        {
            _photoService = photoService;
        }

    }
}