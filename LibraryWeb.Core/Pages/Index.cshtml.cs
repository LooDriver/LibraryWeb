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
            // ���� ������ ��������� POST-�������

            // �������� �� �������� Swagger
            return Redirect("/swagger");
        }
    }
}
