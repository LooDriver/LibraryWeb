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
        }; //<--- ��������� �������, �������� �� � �������� ������� ��� ����� � ����������� �������������

        [HttpGet]
        public IEnumerable<�����> GetBooks()
        {
            db = DatabaseContext.GetContext();
            return db.�����s.Take(db.�����s.Count());
        }



        [HttpGet("book/{name?}")]
        public async Task<�����> GetBookById([FromQuery] string name)
        {
            db = DatabaseContext.GetContext();
            int id = -1;
            foreach(var item in db.�����s)
            {
                if (item.�������� == name) id = item.��������;
            }

            var book = await db.�����s.FindAsync(id);
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