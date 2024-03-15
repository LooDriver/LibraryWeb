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

        /// <summary>
        /// Проверяет находится ли книга уже в избранном
        /// </summary>
        /// <returns></returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("existFavorite")]
        public async Task<IActionResult> CheckExistFavorite([FromQuery] int userID, [FromQuery] string bookName)
        {
            var userFavorites = await GetFavoriteItem(userID);
            Книги favorBook = await db.Книгиs.FindAsync(db.Книгиs.FirstOrDefault(x => x.Название == bookName).КодКниги);
            var item = from p in userFavorites
                       where p.КодКниги == favorBook.КодКниги
                       select p;
            if (item.Any()) { return BadRequest(); }
            else { return Ok(); }
        }

        /// <summary>
        /// Получения всех книг которые находятся у текущего пользователя в избранном
        /// </summary>
        /// <param name="userID">Код пользователя</param>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getFavorite")]
        public async Task<IActionResult> GetAllFavorite([FromQuery] int userID)
        {
            var userFavorites = await GetFavoriteItem(userID);
            if (userFavorites is null) return BadRequest();
            return Json(userFavorites);
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addFavorite")]
        public async Task<IActionResult> AddNewFavorite([FromForm] string nameBook, [FromForm] int userID)
        {
            Книги favorBook = await db.Книгиs.FindAsync(db.Книгиs.FirstOrDefault(x => x.Название == nameBook).КодКниги);
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

        private Task<List<Избранное>> GetFavoriteItem(int userID) => db.Избранноеs.AsNoTracking().Include(x => x.КодКнигиNavigation).Where(f => f.КодПользователя == userID).ToListAsync();
    }
}
