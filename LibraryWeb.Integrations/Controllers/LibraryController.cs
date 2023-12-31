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
        public IEnumerable<�����> GetAuthors() => db.�����s.Take(db.�����s.Count());


        [HttpPost]
        public IActionResult PostAuthors([FromBody] ����� �����)
        {
            if (����� == null)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    db.�����s.Add(�����);
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
            var item = db.�����s.Find(id);
            if (item == null)
            {
                return BadRequest();
            }
            else
            {
                try
                {
                    db.�����s.Remove(item);
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