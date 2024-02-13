using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace LibraryWeb.Integrations.Controllers.AuthenticationController
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        DatabaseContext db;

        private string JWTCreate(Пользователи user)
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Логин) };
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE, // Обязательно укажите ожидаемую аудиторию
                    claims: claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromSeconds(60)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }


        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("login")]
        public IActionResult CheckLogin([FromBody] Пользователи logins)
        {
            db = DatabaseContext.GetContext();
            var item = db.Пользователиs.Where(x => x.Логин == logins.Логин && x.Пароль == logins.Пароль);
            if (item.Any())
            {
                return Ok();/*Ok(JWTCreate(logins));*/
            }
            else
            {
                return Unauthorized("Такого пользователя не существует.\nПроверьте данные для входа или зарегистрируетесь");
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
