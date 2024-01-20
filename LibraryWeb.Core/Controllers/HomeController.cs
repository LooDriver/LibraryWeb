using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Core.Controllers
{
    
    public class HomeController : Controller
    {
        [Route("/")]
        public IActionResult Index() => View();

        [Route("book/{name?}")]
        public IActionResult AboutBook() => View();

        //[Route("panel")]
        //public IActionResult Panel() => View();

        [Route("/easydata/{**entity}")]
        public IActionResult EasyData() => View();
    }
}
