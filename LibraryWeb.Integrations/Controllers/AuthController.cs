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

        private static string JWTCreate(string username)
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, username) };
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
        public async Task<IActionResult> LoginExistUserAsync([FromForm] string username, [FromForm] string password)
        {
            var currentUser = await _authRepository.CheckLoginAsync(username, password);
            return (currentUser is not null) ? Json(new { auth_key = JWTCreate(username), role = currentUser.КодРоли, userID = currentUser.КодПользователя }) : Unauthorized("Такого пользователя не существует.\nПроверьте данные для входа");
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUserAsync([FromForm] string surname, [FromForm] string name, [FromForm] string username, [FromForm] string password) => (await _authRepository.RegisterUsersAsync(surname, name, username, password)) ? Ok() : BadRequest("Все поля должны быть заполнены.");

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("validationAccount")]
        public async Task<IActionResult> ValidationRecoveryAccount([FromForm] string username) => (await _authRepository.ValidationRecoveryAccount(username) ? Ok() : BadRequest("Такого пользователя не существует.\nПроверьте правильность введеного логина"));

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("recoveryAccount")]
        public async Task<IActionResult> RecoveryAccountAsync([FromForm] string username, [FromForm] string newPassword) => (await _authRepository.RecoveryAccountAsync(username, newPassword) ? Ok() : BadRequest());
    }
    public class AuthOptions
    {
        public const string ISSUER = "Server";
        public const string AUDIENCE = "Client";
        const string KEY = "mysupersecret_secretsecretsecretkey!123";

        public AuthController AuthController
        {
            get => default;
            set
            {
            }
        }

        public static SymmetricSecurityKey GetSymmetricSecurityKey() => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
