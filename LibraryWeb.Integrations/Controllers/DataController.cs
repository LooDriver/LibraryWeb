using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class DataController : ControllerBase
    {
        DatabaseContext db;

        [HttpGet]
        public IEnumerable<�����> GetBooks()
        {
            db = DatabaseContext.GetContext();
            return db.�����s.Take(db.�����s.Count());
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