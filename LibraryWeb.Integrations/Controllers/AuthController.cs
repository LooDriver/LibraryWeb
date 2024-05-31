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

        /// <summary>
        /// Метод для создания JWT токена авторизации
        /// </summary>
        /// <param name="username">Логин пользователя</param>
        /// <returns>Готовый JWT токен для авторизации</returns>
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

        /// <summary>
        /// Метод для авторизации уже существующей учетной записи пользователя
        /// </summary>
        /// <param name="username">Логин пользователя</param>
        /// <param name="password">Пароль пользователя</param>
        /// <returns>OK, если данные корректные BadRequest, если в данного пользователя нету или введенны неверные данные</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("login")]
        public async Task<IActionResult> LoginExistUserAsync([FromForm] string username, [FromForm] string password)
        {
            var currentUser = await _authRepository.CheckLoginAsync(username, password);
            return (currentUser is not null) ? Json(new { auth_key = JWTCreate(username), role = currentUser.КодРоли, userID = currentUser.КодПользователя }) : Unauthorized("Такого пользователя не существует.\nПроверьте данные для входа");
        }

        /// <summary>
        /// Метод для регистрации новой учетной записи пользователя
        /// </summary>
        /// <param name="surname">Фамилия пользователя</param>
        /// <param name="name">Имя пользователя</param>
        /// <param name="username">Логин пользователя</param>
        /// <param name="password">Пароль пользователя</param>
        /// <returns>OK, если данные корректные BadRequest, если в какие-то поля не заполнены</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUserAsync([FromForm] string surname, [FromForm] string name, [FromForm] string username, [FromForm] string password) => (await _authRepository.RegisterUsersAsync(surname, name, username, password)) ? Ok() : BadRequest("Все поля должны быть заполнены.");

        /// <summary>
        /// Метод для проверки на наличие учетной записи пользователя
        /// </summary>
        /// <param name="username">Логин пользователя</param>
        /// <returns>OK, если учетная запись существует BadRequest, если такой учетной записи нету</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("validationAccount")]
        public async Task<IActionResult> ValidationRecoveryAccount([FromForm] string username) => (await _authRepository.ValidationRecoveryAccount(username) ? Ok() : BadRequest("Такого пользователя не существует.\nПроверьте правильность введеного логина"));

        /// <summary>
        /// Метод для восставновления пароль от учетной записи пользователя
        /// </summary>
        /// <param name="username">Логин пользователя</param>
        /// <param name="newPassword">Новый пароль от учетной записи</param>
        /// <returns>OK, если изменения прошли успешно BadRequest, если возникла ошибка при изменения данных</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("recoveryAccount")]
        public async Task<IActionResult> RecoveryAccountAsync([FromForm] string username, [FromForm] string newPassword) => (await _authRepository.RecoveryAccountAsync(username, newPassword) ? Ok() : BadRequest());
    }
    public class AuthOptions
    {
        public const string ISSUER = "Server";
        public const string AUDIENCE = "Client";
        const string KEY = "mysupersecret_secretsecretsecretkey!123";
        public static SymmetricSecurityKey GetSymmetricSecurityKey() => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
