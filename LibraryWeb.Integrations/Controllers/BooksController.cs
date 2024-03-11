using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        DatabaseEntities db;

        public BooksController()
        {
            db = new DatabaseEntities();
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("allBooks")]
        public JsonResult GetBooks() => Json(db.Книгиs.AsNoTracking().Take(db.Книгиs.Count()));

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet]
        public async Task<JsonResult> GetBookByName([FromQuery] string name, CancellationToken cancellationToken = default)
        {
            var bookName = await db.Книгиs.AsNoTracking().FirstOrDefaultAsync(x => x.Название == name, cancellationToken);
            if (bookName is null) { return Json(default); }
            else
            {
                return Json(bookName);
            }
        }
    }
}
