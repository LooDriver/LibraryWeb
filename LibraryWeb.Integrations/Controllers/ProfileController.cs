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
            Пользователи userProfile = db.Пользователиs.First(f => f.КодПользователя == userID);
            if (userProfile is null) return BadRequest();
            return Json(new
            {
                Surname = userProfile.Фамилия,
                Name = userProfile.Имя,
                Login = userProfile.Логин
            });
        }
    }
}
