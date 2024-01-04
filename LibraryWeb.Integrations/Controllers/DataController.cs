using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        DatabaseContext db;
        static List<UsersLogins> loginsAll = new List<UsersLogins>()
        {
            new UsersLogins("admin", "123456789")
        }; //<--- временное решение, обновить бд и добавить таблицу для входа и регистрации пользователей

        [HttpGet]
        public IEnumerable<Книги> GetBooks()
        {
            db = DatabaseContext.GetContext();
            return db.Книгиs.Take(db.Книгиs.Count());
        }



        [HttpGet("book/{name?}")]
        public async Task<Книги> GetBookById([FromQuery] string name)
        {
            db = DatabaseContext.GetContext();
            int id = -1;
            foreach(var item in db.Книгиs)
            {
                if (item.Название == name) id = item.КодКниги;
            }

            var book = await db.Книгиs.FindAsync(id);
            return book;
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