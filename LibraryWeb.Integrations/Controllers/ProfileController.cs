using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController : Controller
    {
        private readonly IProfileRepository<Пользователи> _profileService;

        public ProfileController(IProfileRepository<Пользователи> profileService)
        {
            _profileService = profileService;
        }

        public Services.ProfileService ProfileService
        {
            get => default;
            set
            {
            }
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("profileInformation")]
        public async Task<IActionResult> GetProfileInformation([FromQuery] int userID)
        {
            var currentUser = await _profileService.GetById(userID);
            return Json(new
            {
                Surname = currentUser.Фамилия,
                Name = currentUser.Имя,
                Login = currentUser.Логин,
                Photo = currentUser.Фото
            });
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("commentProfileInformation")]
        public async Task<JsonResult> GetUserCommentInformation([FromQuery] string username)
        {
            var commentUser = await _profileService.GetByUsername(username);
            return Json(new
            {
                Surname = commentUser.Фамилия,
                Name = commentUser.Имя,
                Login = commentUser.Логин,
                Photo = commentUser.Фото
            });
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("editProfile")]
        public async Task<IActionResult> UpdateProfileData([FromQuery] int userID, [FromForm] string name, [FromForm] string surname, [FromForm] string username) => (await _profileService.EditProfileAsync(userID, name, surname, username)) ? Ok() : BadRequest();

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("editPhoto")]
        public async Task<IActionResult> UpdateProfilePhoto([FromForm] int userID, [FromForm] string photoData) => (await _profileService.EditProfilePhotoAsync(userID, photoData)) ? Ok() : BadRequest();

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("editPassword")]
        public async Task<IActionResult> UpdateProfilePassword([FromForm] int userID, [FromForm] string password) => (await _profileService.EditProfilePasswordAsync(userID, password)) ? Ok() : BadRequest();
    }
}
