using LibraryWeb.Integrations.Controllers.AuthenticationController;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace LibraryWeb.Core.Controllers
{
    
    public class HomeController : Controller
    {
        private static bool _accessPanel = false;

        [Route("/")]
        public IActionResult Index() => View();

        [Route("book/{name?}")]
        public IActionResult AboutBook() => View();

        [Route("easydata/{**entity}")]
        public IActionResult EasyData()
        {
            string authKey = HttpContext.Request.Cookies["auth_key"];

            var token = authKey.Replace("Bearer ", "");

            if (!IsTokenValid(token))
            {
                return Unauthorized();
            }
            return View();
        }

        public bool IsTokenValid(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = GetValidationParameters();

            try
            {
                SecurityToken validatedToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
                return true;
            }
            catch
            {
                return false;
            }
        }

        private TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = true, // Because there is expiration in the generated token
                ValidateAudience = true, // Ensure that the token audience matches our audience value
                ValidateIssuer = true,   // Ensure that the token issuer matches our issuer value
                ValidIssuer = AuthOptions.ISSUER,
                ValidAudience = AuthOptions.AUDIENCE,
                IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey() // The same key as the one that generate the token
            };
        }


    }
}
