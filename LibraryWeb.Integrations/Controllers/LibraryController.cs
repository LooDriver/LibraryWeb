using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Model;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LibraryController : ControllerBase
    {
        DatabaseContext db = DatabaseContext.GetContext();

        [HttpGet]
        public IEnumerable<Автор> GetAuthors()
        {
            return db.Авторs.Take(db.Авторs.Count());
        }


        [HttpPost]
        public async Task<IActionResult> PostAuthors([FromBody] Автор автор)
        {
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
    }
}