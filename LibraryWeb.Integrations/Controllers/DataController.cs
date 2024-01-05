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
            await db.����s.LoadAsync();
            await db.�����s.LoadAsync();
            await db.�����s.LoadAsync();

            var book = await db.�����s.ToListAsync();
            var genre = await db.����s.ToListAsync();
            var author = await db.�����s.ToListAsync();

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
            foreach(var item in db.�����s)
            {
                if (item.�������� == name) id = item.��������;
            }

            var book = await db.�����s.FindAsync(id);
            return Json(book);
        }

        [HttpPost("auth")]
        public IActionResult CheckLogin([FromBody] ������������ logins)
        {
            db = DatabaseContext.GetContext();
            var item = db.������������s.Where(x => x.����� == logins.����� && x.������ == logins.������);
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
        public async Task<IActionResult> RegisterUser([FromBody] ������������ registers)
        {
            db = DatabaseContext.GetContext();
            if (registers.����� == null || registers.������ == null)
            {
                return BadRequest();
            }
            else
            {
                db.������������s.Add(registers);
                await db.SaveChangesAsync();
                return Ok();
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAuthors([FromBody] ����� �����)
        {
            db = DatabaseContext.GetContext();
            if (�����.��� == null)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    db.�����s.Add(�����);
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
            var item = await db.�����s.FindAsync(id);
            if (item == null)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    db.�����s.Remove(item);
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
        public async Task<IActionResult> UpdateAuthors([FromBody] ����� �����)
        {
            db = DatabaseContext.GetContext();
            var id = �����.���������;
            var item = await db.�����s.FindAsync(id);
            if (item == null) return BadRequest();
            else
            {
                try
                {
                    item.��� = �����.���;
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