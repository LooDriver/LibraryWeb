using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Core.Controllers
{
    public class SwagerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult RedirectToSwagger()
        {
            // Перенаправьте на действие Swagger в вашем контроллере
            return Redirect("/swagger/index.html");
        }
    }
}
