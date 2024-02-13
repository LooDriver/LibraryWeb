using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace LibraryWeb.Integrations.Controllers.AuthenticationController
{
    public class AuthOptions
    {
        public const string ISSUER = "Server"; // издатель токена
        public const string AUDIENCE = "Client"; // потребитель токена
        const string KEY = "mysupersecret_secretsecretsecretkey!123";   // ключ для шифрации
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
