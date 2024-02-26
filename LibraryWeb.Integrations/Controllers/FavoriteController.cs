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
        public async Task<IActionResult> GetAllFavorite([FromQuery] int userID)
        {
            db.Избранноеs.Include(x => x.КодКнигиNavigation).Load();
            var userFavorites = await db.Избранноеs.Include(x => x.КодКнигиNavigation).Where(f => f.КодПользователя == userID).ToListAsync();
            if (userFavorites is null) return BadRequest();
            return Json(userFavorites);
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addFavorite")]
        public async Task<IActionResult> AddNewFavorite([FromQuery] string nameBook, int userID)
        {
            Книги favorBook = await db.Книгиs.FindAsync(db.Книгиs.First(x => x.Название == nameBook).КодКниги);
            if (favorBook is null) return BadRequest();
            else
            {
                Избранное избранное = new Избранное();
                избранное.КодКниги = favorBook.КодКниги;
                избранное.КодПользователя = userID;
                await db.Избранноеs.AddAsync(избранное);
                await db.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
