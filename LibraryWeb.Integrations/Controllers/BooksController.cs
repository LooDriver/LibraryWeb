using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly IBookRepository<Книги> _bookService;

        public BooksController(IBookRepository<Книги> bookService)
        {
            _bookService = bookService;
        }

        /// <summary>
        /// Метод для получения всех книг из базы данных
        /// </summary>
        /// <returns>Json обьект книг для их последующей десериализации</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("allBooks")]
        public JsonResult GetBooks() => Json(_bookService.GetAll());

        /// <summary>
        /// Метод для получения подробной информации о конкретной книге
        /// </summary>
        /// <param name="name">Название книги</param>
        /// <returns>Json обьект конкретной книги для его последующей десериализации</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet]
        public async Task<JsonResult> GetBookByNameAsync([FromQuery] string name) => Json(await _bookService.GetByNameAsync(name));
    }
}
