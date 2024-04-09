using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository<Пользователи> _authRepository;

        public AuthController(IAuthRepository<Пользователи> authRepository)
        {
            _authRepository = authRepository;
        }

        private static string JWTCreate(Пользователи user)
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
        public async Task<IActionResult> CheckLogin([FromForm] Пользователи logins)
        {
            var currentUser = await _authRepository.CheckLogin(logins);
            return (currentUser != null) ? Ok(new { auth_key = JWTCreate(logins), role = currentUser.КодРоли, userID = currentUser.КодПользователя }) : Unauthorized("Такого пользователя не существует.\nПроверьте данные для входа");

        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromForm] Пользователи registers) => (await _authRepository.RegisterUsers(registers)) ? Ok() : BadRequest("Все поля должны быть заполнены.");
    }
    public class AuthOptions
    {
        public const string ISSUER = "Server";
        public const string AUDIENCE = "Client";
        const string KEY = "mysupersecret_secretsecretsecretkey!123";
        public static SymmetricSecurityKey GetSymmetricSecurityKey() => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
