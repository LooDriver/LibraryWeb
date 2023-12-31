using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Model;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        DatabaseContext db = DatabaseContext.GetContext();


        [HttpGet]
        public IEnumerable<Автор> GetAuthors() => db.Авторs.Take(db.Авторs.Count());


        [HttpPost]
        public IActionResult PostAuthors([FromBody] Автор автор)
        {
            if (автор == null)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    db.Авторs.Add(автор);
                    db.SaveChanges();
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpDelete("{id?}")]
        public IActionResult DeleteAuthors(int id)
        {
            var item = db.Авторs.Find(id);
            if (item == null)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    db.Авторs.Remove(item);
                    db.SaveChanges();
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