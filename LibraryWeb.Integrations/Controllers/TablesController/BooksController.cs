using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers.TablesController
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        DatabaseContext db;

        [HttpGet("allBooks")]
        public async Task<JsonResult> GetBooks()
        {
            db = DatabaseContext.GetContext();
            await db.Жанрs.LoadAsync();
            await db.Книгиs.LoadAsync();
            await db.Авторs.LoadAsync();

            var book = await db.Книгиs.ToListAsync();
            var genre = await db.Жанрs.ToListAsync();
            var author = await db.Авторs.ToListAsync();

            var books = new
            {
                Books = book,
                Genres = genre,
                Authors = author
            };

            return Json(books);

        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("book/{name?}")]
        public async Task<JsonResult> GetBookById([FromQuery] string name)
        {
            db = DatabaseContext.GetContext();
            int id = -1;
            foreach (var item in db.Книгиs)
            {
                if (item.Название == name) id = item.КодКниги;
            }

            var book = await db.Книгиs.FindAsync(id);
            return Json(book);
        }

    }
}
