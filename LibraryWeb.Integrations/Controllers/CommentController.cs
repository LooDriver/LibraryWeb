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

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getAllComments")]
        public JsonResult GetAllComments(string bookName) => Json(_commentService.GetAll(bookName));

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addComment")]
        public async Task<IActionResult> AddNewComments(string comment, int userID, string bookName) => (await _commentService.AddNewCommentAsync(comment, userID, bookName) ? Ok() : BadRequest());
    }
}
