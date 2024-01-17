using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers.TablesController
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        DatabaseContext db = DatabaseContext.GetContext();

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("allBooks")]
        public JsonResult GetBooks() => Json(db.Книгиs.Take(db.Книгиs.Count()));

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("{name?}")]
        public async Task<JsonResult> GetBookByName([FromQuery] string name)
        {
            int bookName = db.Книгиs.First(x => x.Название == name).КодКниги;
            Книги книги = await db.Книгиs.FindAsync(bookName);
            var books = new
            {
                Book = книги,
                Author = await db.Авторs.FindAsync(книги.КодАвтора),
                Genre = await db.Жанрs.FindAsync(книги.КодЖанра)
            };
            return Json(books);
        }

    }
}
