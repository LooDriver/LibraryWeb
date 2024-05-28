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

        /// <summary>
        /// Метод для получения данных учетной записи пользователя
        /// </summary>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <returns>Json обьект данных пользователя для его последующей десериализации</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("profileInformation")]
        public async Task<IActionResult> GetProfileInformationAsync([FromQuery] int userID)
        {
            var currentUser = await _profileService.GetByUserIDAsync(userID);
            return Json(new
            {
                Surname = currentUser.Фамилия,
                Name = currentUser.Имя,
                Login = currentUser.Логин,
                Photo = currentUser.Фото
            });
        }

        /// <summary>
        /// Метод для получения данных учетной записи пользователя который оставил комментарий к книге
        /// </summary>
        /// <param name="username">Логин пользователя</param>
        /// <returns>Json обьект данных пользователя для его последующей десериализации</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("commentProfileInformation")]
        public async Task<JsonResult> GetUserCommentInformationAsync([FromQuery] string username)
        {
            var commentUser = await _profileService.GetByUsernameAsync(username);
            return Json(new
            {
                Surname = commentUser.Фамилия,
                Name = commentUser.Имя,
                Login = commentUser.Логин,
                Photo = commentUser.Фото
            });
        }

        /// <summary>
        /// Метод для смены данных пользователя в профиле
        /// </summary>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <param name="name">Имя пользователя</param>
        /// <param name="surname">Фамилия пользователя</param>
        /// <param name="username">Логин пользователя</param>
        /// <returns>OK, если данные пользователя успешно изменены, BadRequest если возникли ошибки при изменении</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("editProfile")]
        public async Task<IActionResult> UpdateProfileDataAsync([FromQuery] int userID, [FromForm] string name, [FromForm] string surname, [FromForm] string username) => (await _profileService.EditProfileAsync(userID, name, surname, username)) ? Ok() : BadRequest();

        /// <summary>
        /// Метод для смены фото профиля 
        /// </summary>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <param name="photoData">Бинарный код фото</param>
        /// <returns>OK, если фото успешно изменено, BadRequest если возникли ошибки при изменении</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("editPhoto")]
        public async Task<IActionResult> UpdateProfilePhotoAsync([FromForm] int userID, [FromForm] string photoData) => (await _profileService.EditProfilePhotoAsync(userID, photoData)) ? Ok() : BadRequest();

        /// <summary>
        /// Метод для установки нового пароля для профиля пользователя
        /// </summary>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <param name="password">Новый пароль для учетной записи</param>
        /// <returns>OK, если пароль для учетной записи успешно изменен, BadRequest если возникли ошибки при изменении</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("editPassword")]
        public async Task<IActionResult> UpdateProfilePasswordAsync([FromForm] int userID, [FromForm] string password) => (await _profileService.EditProfilePasswordAsync(userID, password)) ? Ok() : BadRequest();
    }
}
