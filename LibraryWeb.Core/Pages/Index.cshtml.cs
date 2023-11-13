using LibraryWeb.Core.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace LibraryWeb.Core.Pages
{
    public class IndexModel : PageModel
    {
        public void OnGet()
        {

        }
        public IActionResult OnPost()
        {
            // Ваша логика обработки POST-запроса

            // Редирект на страницу Swagger
            return Redirect("/swagger");
        }
    }
}
