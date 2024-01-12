using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers.TablesController
{
    [Route("api/[controller]")]
    public class GenreController : Controller
    {
        DatabaseContext db;

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getGenres")]
        public async Task<JsonResult> GetGenres()
        {
            db = DatabaseContext.GetContext();
            await db.Жанрs.LoadAsync();
            var genres = db.Жанрs.ToList();
            return Json(genres);
        }
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addGenre")]
        public async Task<IActionResult> AddGenre([FromBody] Жанр жанр)
        {
            db = DatabaseContext.GetContext();
            if (жанр.НазваниеЖанра == "" && жанр == null) return BadRequest();
            else
            {
                await db.Жанрs.AddAsync(жанр);
                await db.SaveChangesAsync();
                return Ok();

            }

        }
    }
}
