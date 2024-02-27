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
        public JsonResult GetBooks() => Json(db.Книгиs.Take(db.Книгиs.Count()));

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet]
        public async Task<JsonResult> GetBookByName([FromQuery] string name)
        {
            var bookName = await db.Книгиs.FirstOrDefaultAsync(x => x.Название == name);
            int bookId = bookName != null ? bookName.КодКниги : 0;
            Книги книги = await db.Книгиs.FindAsync(bookId);
            if (книги == null) { return Json(null); }
            else
            {
                return Json(new
                {
                    Book = книги,
                    Author = книги.Автор,
                    Genre = книги.Жанр
                });
            }
        }
    }
}
