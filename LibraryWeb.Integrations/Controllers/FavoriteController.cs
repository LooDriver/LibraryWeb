using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class FavoriteController : Controller
    {
        DatabaseEntities db;

        public FavoriteController()
        {
            db = new DatabaseEntities();
        }


        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getFavorite")]
        public IActionResult GetAllFavorite()
        {
            db.Избранноеs.Include(x => x.КодКнигиNavigation).Load();
            return Json(db.Избранноеs.Take(db.Избранноеs.Count()));
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addFavorite")]
        public async Task<IActionResult> AddFavorite([FromBody] string nameBook)
        {
            Книги favorBook = await db.Книгиs.FindAsync(db.Книгиs.First(x => x.Название == nameBook).КодКниги);
            if (favorBook is null) return BadRequest();
            else
            {
                Избранное избранное = new Избранное();
                избранное.КодКниги = favorBook.КодКниги;
                await db.Избранноеs.AddAsync(избранное);
                await db.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
