using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        DatabaseContext db;

        [HttpGet]
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

        [HttpGet("book/{name?}")]
        public async Task<JsonResult> GetBookById([FromQuery] string name)
        {
            db = DatabaseContext.GetContext();
            int id = -1;
            foreach(var item in db.Книгиs)
            {
                if (item.Название == name) id = item.КодКниги;
            }

            var book = await db.Книгиs.FindAsync(id);
            return Json(book);
        }

        [HttpPost("auth")]
        public IActionResult CheckLogin([FromBody] Пользователи logins)
        {
            db = DatabaseContext.GetContext();
            var item = db.Пользователиs.Where(x => x.Логин == logins.Логин && x.Пароль == logins.Пароль);
            if(item.Any())
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] Пользователи registers)
        {
            db = DatabaseContext.GetContext();
            if (registers.Логин == null || registers.Пароль == null)
            {
                return BadRequest();
            }
            else
            {
                db.Пользователиs.Add(registers);
                await db.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAuthors([FromBody] Автор автор)
        {
            db = DatabaseContext.GetContext();
            if (автор.Фио == null)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    db.Авторs.Add(автор);
                    await db.SaveChangesAsync();
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpDelete("{id?}")]
        public async Task<IActionResult> DeleteAuthors([FromForm] int id)
        {
            db = DatabaseContext.GetContext();
            var item = await db.Авторs.FindAsync(id);
            if (item == null)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    db.Авторs.Remove(item);
                    await db.SaveChangesAsync();
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAuthors([FromBody] Автор автор)
        {
            db = DatabaseContext.GetContext();
            var id = автор.КодАвтора;
            var item = await db.Авторs.FindAsync(id);
            if (item == null) return BadRequest();
            else
            {
                try
                {
                    item.Фио = автор.Фио;
                    await db.SaveChangesAsync();
                    return Ok();
                }
                catch(Exception exp)
                {
                    return BadRequest(exp.Message);
                }
            }
        }
    }
}