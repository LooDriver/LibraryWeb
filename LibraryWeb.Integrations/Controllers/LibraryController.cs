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
        public IEnumerable<�����> GetAuthors()
        {
            return db.�����s.Take(db.�����s.Count());
        }


        [HttpPost]
        public async Task<IActionResult> PostAuthors([FromBody] ����� �����)
        {
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
    }
}