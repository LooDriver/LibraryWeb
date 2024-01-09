using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers.TablesController
{
    [Route("api/[controller]")]
    public class AuthorController : Controller
    {
        DatabaseContext db;

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getAuthors")]
        public async Task<JsonResult> GetAuthors()
        {
            db = DatabaseContext.GetContext();
            await db.Авторs.LoadAsync();
            var author = db.Авторs.ToList();
            return Json(author);
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addAuthor")]
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

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpDelete("deleteAuthor/{id}")]
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

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPut("editAuthor")]
        public async Task<IActionResult> UpdateAuthors([FromBody] Автор автор)
        {
            db = DatabaseContext.GetContext();
            var item = await db.Авторs.FindAsync(автор.КодАвтора);
            if (item == null) return BadRequest();
            else
            {
                try
                {
                    item.Фио = автор.Фио;
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