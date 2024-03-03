using LibraryWeb.Integrations.Controllers.AuthenticationController;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace LibraryWeb.Core.Controllers
{

    public class HomeController : Controller
    {

        [Route("/")]
        public IActionResult Index() => View();

        [Route("book/{name?}")]
        public IActionResult AboutBook() => View();

        [Route("easydata/{**entity}")]
        public IActionResult EasyData()
        {
            if (!IsTokenValid(HttpContext.Request.Cookies["auth_key"]) || HttpContext.Request.Cookies["permission"] == "2")
            {
                return Redirect("accessdenied");
            }
            return View();
        }

        [Route("accessdenied")]
        public IActionResult AccessDenied() => View();

        [Route("profile")]
        public IActionResult Profile() => View();

        [Route("cart")]
        public IActionResult Cart() => View();

        [Route("pickup-point")]
        public IActionResult PickupPoint() => View();

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
