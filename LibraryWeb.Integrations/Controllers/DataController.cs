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
        static List<UsersLogins> loginsAll = new List<UsersLogins>()
        {
            new UsersLogins("admin", "123456789")
        }; //<--- временное решение, обновить бд и добавить таблицу для входа и регистрации пользователей

        [HttpGet]
        public JsonResult GetBooks()
        {

            db = DatabaseContext.GetContext();
            db.Жанрs.Load();
            db.Книгиs.Load();
            db.Авторs.Load();
            var book = db.Книгиs.ToList();
            var genre = db.Жанрs.ToList();
            var author = db.Авторs.ToList();

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles
                // Другие необходимые настройки JsonSerializerOptions...
            };
            var books = new
            {
                Books = book,
                Genres = genre,
                Authors = author
            };

            return Json(books, options);

        }



        [HttpGet("book/{name?}")]
        public async Task<JsonResult> GetBookById([FromQuery] string name)
        {
            db = DatabaseContext.GetContext();
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles
            };
            int id = -1;
            foreach(var item in db.Книгиs)
            {
                if (item.Название == name) id = item.КодКниги;
            }

            var book = await db.Книгиs.FindAsync(id);
            return Json(book, options);
        }

        [HttpPost("auth")]
        public IActionResult CheckLogin([FromBody] UsersLogins logins)
        {
            var item = loginsAll.Where(x => x.Login == logins.Login && x.Password == logins.Password);
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
        public IActionResult RegisterUser([FromBody] UsersLogins logins)
        {
            if(logins.Login == null || logins.Password == null)
            {
                return BadRequest();
            }
            else
            {
                loginsAll.Add(new UsersLogins(logins.Login, logins.Password));
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