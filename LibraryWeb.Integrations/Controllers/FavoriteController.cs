using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class FavoriteController : Controller
    {
        private readonly IFavoriteRepository<Избранное> _favoriteService;

        public FavoriteController(IFavoriteRepository<Избранное> favoriteService)
        {
            _favoriteService = favoriteService;
        }

        /// <summary>
        /// Проверяет находится ли книга уже в избранном
        /// </summary>
        /// <returns></returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("existFavorite")]
        public IActionResult CheckExistFavorite([FromQuery] int userID, [FromQuery] string bookName) => (_favoriteService.CheckExistFavorite(userID, bookName)) ? Ok() : BadRequest();

        /// <summary>
        /// Получения всех книг которые находятся у текущего пользователя в избранном
        /// </summary>
        /// <param name="userID">Код пользователя</param>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getFavorite")]
        public IActionResult GetAllFavorite([FromQuery] int userID) => Json(_favoriteService.GetAll(userID));

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addFavorite")]
        public IActionResult AddNewFavorite([FromForm] string nameBook, [FromForm] int userID) => (_favoriteService.Add(nameBook, userID)) ? Ok() : BadRequest();

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("deleteFavorite")]
        public IActionResult RemoveExistFavorite([FromForm] string bookName) => (_favoriteService.Delete(bookName)) ? Ok() : BadRequest();
    }
}
