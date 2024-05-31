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
        /// Метод для получения всех книг в избранном
        /// </summary>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <returns>Json обьект книг которые находятся в избранном для их последующей десериализации</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getFavorite")]
        public IActionResult GetAllFavorite([FromQuery] int userID) => Json(_favoriteService.GetAll(userID));

        /// <summary>
        /// Метод для проверки на наличии книги в избранном
        /// </summary>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <param name="bookName">Название книги</param>
        /// <returns>OK, если книга уже находятся в избранном, BadRequest если книга не находится в избранном</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("existFavorite")]
        public IActionResult CheckExistFavorite([FromQuery] int userID, [FromQuery] string bookName) => (_favoriteService.CheckExistFavorite(userID, bookName)) ? Ok() : BadRequest();

        /// <summary>
        /// Метод для добавлении книги в избранное
        /// </summary>
        /// <param name="nameBook">Название книги</param>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <returns>OK, если книга успешно добавлена в избранное, BadRequest если возникли ошибки при добавлении</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addFavorite")]
        public async Task<IActionResult> AddNewFavoriteAsync([FromForm] string nameBook, [FromForm] int userID) => (await _favoriteService.AddFavoriteBookAsync(nameBook, userID)) ? Ok() : BadRequest();

        /// <summary>
        /// Метод для удаления книги из избранного
        /// </summary>
        /// <param name="bookName">Название книги</param>
        /// <returns>OK, если книга успешно удалена из избранного, BadRequest если возникли ошибки при удалении</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("deleteFavorite")]
        public async Task<IActionResult> RemoveExistFavoriteAsync([FromForm] string bookName) => (await _favoriteService.DeleteFavoriteBookAsync(bookName)) ? Ok() : BadRequest();
    }
}
