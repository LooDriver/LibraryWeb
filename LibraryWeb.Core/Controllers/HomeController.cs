using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Core.Controllers
{
    
    public class HomeController : Controller
    {
        [Route("/")]
        public IActionResult Index() => View();

        [Route("auth")]
        public IActionResult Auth() => View();

        [Route("book/{name?}")]
        public IActionResult AboutBook() => View();
    }
}
