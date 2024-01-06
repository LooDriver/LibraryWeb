using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]

    public class DataController : Controller
    {
        DatabaseContext db;

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]

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

        [HttpGet("GetAuthors")]
        public async Task<JsonResult> GetAuthors()
        {
            db = DatabaseContext.GetContext();
            await db.�����s.LoadAsync();
            var author = await db.�����s.ToListAsync();
            return Json(author);
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("book/{name?}")]
        public async Task<JsonResult> GetBookById([FromQuery] string name)
        {
            db = DatabaseContext.GetContext();
            int id = -1;
            foreach (var item in db.�����s)
            {
                if (item.�������� == name) id = item.��������;
            }

            var book = await db.�����s.FindAsync(id);
            return Json(book);
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("auth")]
        public IActionResult CheckLogin([FromBody] ������������ logins)
        {
            db = DatabaseContext.GetContext();
            bool dataEmptyCheck = logins.�����.Length > 0 && logins.������.Length > 0 ? true : false;
            switch (dataEmptyCheck)
            {
                case true:
                    {
                        var item = db.������������s.Where(x => x.����� == logins.����� && x.������ == logins.������);
                        if (item.Any()) return Ok();
                        else return BadRequest();
                    }
                case false:
                    {
                        return BadRequest();
                    }
            }
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] ������������ registers)
        {
            db = DatabaseContext.GetContext();
            if (registers.�����.Length > 0 && registers.������.Length > 0)
            {
                await db.������������s.AddAsync(registers);
                await db.SaveChangesAsync();
                return Ok();

            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("addAuthor")]
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

        [HttpPut("editAuthor")]
        public async Task<IActionResult> UpdateAuthors([FromBody] ����� �����)
        {
            db = DatabaseContext.GetContext();
            var item = await db.�����s.FindAsync(�����.���������);
            if (item == null) return BadRequest();
            else
            {
                try
                {
                    item.��� = �����.���;
                    await db.SaveChangesAsync();
                    return Ok();
                }
                catch (Exception exp)
                {
                    return BadRequest(exp.Message);
                }
            }
        }
    }
}