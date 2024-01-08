using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers.AuthenticationController
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        DatabaseContext db;

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("enter")]
        public JsonResult CheckLogin([FromBody] Пользователи logins)
        {
            db = DatabaseContext.GetContext();
            int exist = -1;
            var result = new
            {
                Exist = exist
            };
            var item = db.Пользователиs.Where(x => x.Логин == logins.Логин && x.Пароль == logins.Пароль);
            if (item.Any())
            {
                exist = 1;
                return Json(result);
            }
            else
            {
                exist = -1;
                return Json(result);
            }
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] Пользователи registers)
        {
            db = DatabaseContext.GetContext();
            if (registers.Логин.Length > 0 && registers.Пароль.Length > 0)
            {
                await db.Пользователиs.AddAsync(registers);
                await db.SaveChangesAsync();
                return Ok();

            }
            else
            {
                return BadRequest();
            }
        }
    }
}
