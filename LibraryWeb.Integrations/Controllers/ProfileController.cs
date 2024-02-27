using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class ProfileController : Controller
    {
        DatabaseEntities db;
        public ProfileController()
        {
            db = new DatabaseEntities();
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("profileInformation")]
        public IActionResult GetProfileInformation([FromQuery] int userID)
        {
            Пользователи userProfile = db.Пользователиs.FirstOrDefault(f => f.КодПользователя == userID);
            if (userProfile is null) return BadRequest();
            return Json(new
            {
                Surname = userProfile.Фамилия,
                Name = userProfile.Имя,
                Login = userProfile.Логин
            });
        }
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getCurrentProfile")]
        public async Task<IActionResult> GetCurrentProfile ([FromQuery] int userID)
        {
            Пользователи userProfile = db.Пользователиs.FirstOrDefault(f => f.КодПользователя == userID);
            if (userProfile is null) return BadRequest();
            else
            {
                
                return Json(new
                {
                    Name = userProfile.Имя,
                    Surname = userProfile.Фамилия,
                    Login = userProfile.Логин
                });
            }
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPut("editProfile")]
        public async Task<IActionResult> PutEditProfileInformation([FromQuery] int userID, [FromBody] Пользователи пользователи)
        {
            Пользователи userProfile = db.Пользователиs.FirstOrDefault(f => f.КодПользователя == userID);
            bool isValid = пользователи.Пароль == "" ? true : false;
            if (userProfile is null || isValid) return BadRequest("Поле с паролем не может быть пустым");
            else
            {
                userProfile.Фамилия = пользователи.Фамилия;
                userProfile.Имя = пользователи.Имя;
                userProfile.Логин = пользователи.Логин;
                userProfile.Пароль = пользователи.Пароль;
                await db.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
