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
        public IActionResult CheckExistFavorite([FromQuery] int userID, [FromQuery] string bookName)
        {
            List<Избранное> listUsersBooks = GetFavoriteItem(userID);

            var userFavoriteBooks = from usersBooks in listUsersBooks
                                    where usersBooks.КодКниги == (db.Книгиs.FirstOrDefault(books => books.Название == bookName).КодКниги)
                                    select usersBooks;
            if (userFavoriteBooks.Any())
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Получения всех книг которые находятся у текущего пользователя в избранном
        /// </summary>
        /// <param name="userID">Код пользователя</param>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getFavorite")]
        public IActionResult GetAllFavorite([FromQuery] int userID)
        {
            var userFavorites = GetFavoriteItem(userID);
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

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("deleteFavorite")]
        public async Task<IActionResult> RemoveExistFavorite([FromForm] string bookName)
        {
            Избранное bookInFavorite = db.Избранноеs.Where(favoriteBook => favoriteBook.КодКниги == (db.Книгиs.FirstOrDefault(books => books.Название == bookName).КодКниги)).Single();
            db.Избранноеs.Remove(bookInFavorite);
            await db.SaveChangesAsync();
            return Ok();
        }

        private List<Избранное> GetFavoriteItem(int userID)
        {
            return (userID <= 0) ? default : db.Избранноеs.AsNoTracking().Include(x => x.КодКнигиNavigation).Where(f => f.КодПользователя == userID).ToList();
        }
    }
}
