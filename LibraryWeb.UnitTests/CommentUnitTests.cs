using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LibraryWeb.UnitTests
{
    public class CommentUnitTests
    {
        private readonly Mock<ICommentsRepository<Комментарии>> _commentServices;

        private readonly CommentController _commentController;

        public CommentUnitTests()
        {
            _commentServices = new Mock<ICommentsRepository<Комментарии>>();
            _commentController = new CommentController(_commentServices.Object);
        }

        [Fact]
        public void GetAll_Json_GetListComments()
        {
            var fakeComments = new List<Комментарии> { new Комментарии { ТекстКомментария = "Test", КодКниги = 1 } };
            _commentServices.Setup(repo => repo.GetAll("Test")).Returns(fakeComments);

            var result = _commentController.GetAllComments("Test");

            var okResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Комментарии>>(okResult.Value);

            Assert.NotEmpty(model);
            Assert.Single(model);
        }

        [Fact]
        public async Task Success_AddComment_Async()
        {
            _commentServices.Setup(repo => repo.AddNewCommentAsync("Test", 1, "TestBook")).ReturnsAsync(true);

            var result = await _commentController.AddNewComments("Test", 1, "TestBook");

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task Bad_AddComment_Async()
        {
            _commentServices.Setup(repo => repo.AddNewCommentAsync("Test", 1, "TestBook")).ReturnsAsync(false);

            var result = await _commentController.AddNewComments("Test", 1, "TestBook");

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }
    }
}
