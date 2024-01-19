using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Core.Controllers
{
    
    public class HomeController : Controller
    {
        [Route("/")]
        public IActionResult Index() => View();

        [Route("{name?}")]
        public IActionResult AboutBook() => View();

        [Route("panel")]
        public IActionResult Panel() => View();
    }
}
