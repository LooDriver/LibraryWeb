using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        private readonly ICommentsRepository<Комментарии> _commentService;

        public CommentController(ICommentsRepository<Комментарии> commentService)
        {
            _commentService = commentService;
        }

        /// <summary>
        /// Метод для получения всех комментарией к книге
        /// </summary>
        /// <param name="bookName">Название книги</param>
        /// <returns>Json обьект комментариев к книге для их последующей десериализации</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getAllComments")]
        public JsonResult GetAllComments(string bookName) => Json(_commentService.GetAll(bookName));

        /// <summary>
        /// Метод для добавления новых комментариев к книге
        /// </summary>
        /// <param name="comment">Текст комментария</param>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <param name="bookName">Название книги</param>
        /// <returns>OK, если комментарии к книге успешно добавлен, BadRequest если возникли ошибки при добавлении</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addComment")]
        public async Task<IActionResult> AddNewCommentsAsync(string comment, int userID, string bookName) => (await _commentService.AddNewCommentAsync(comment, userID, bookName) ? Ok() : BadRequest());
    }
}
