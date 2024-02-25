using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace LibraryWeb.Integrations.Controllers.AuthenticationController
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        DatabaseEntities db;

        public AuthController()
        {
            db = new DatabaseEntities();
        }

        private string JWTCreate(Пользователи user)
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Логин) };
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromHours(10)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }


        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("login")]
        public IActionResult CheckLogin([FromBody] Пользователи logins)
        {
            var item = db.Пользователиs.Where(x => x.Логин == logins.Логин && x.Пароль == logins.Пароль);
            if (item.Any())
            {
                var authKey = new
                {
                    auth_key = JWTCreate(logins),
                    userID = item.Select(x => x.КодПользователя).Single()
                };
                return Ok(authKey);
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
