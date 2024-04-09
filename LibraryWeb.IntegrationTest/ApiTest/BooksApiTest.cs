using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LibraryWeb.IntegrationTest.ApiTest
{
    public class BooksApiTest
    {
        private readonly Mock<IBookRepository<Книги>> _booksService;

        public BooksApiTest()
        {
            _booksService = new Mock<IBookRepository<Книги>>();
        }

        [Fact]
        public void GetBooksList_BooksList()
        {
            var fakeBooks = new List<Книги> { new Книги { Название = "Book 1" }, new Книги { Название = "Book 2" } };
            var mockRepository = new Mock<IBookRepository<Книги>>();
            mockRepository.Setup(repo => repo.GetAll(0)).Returns(fakeBooks);

            var controller = new BooksController(mockRepository.Object);

            var result = controller.GetBooks();

            var okResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Книги>>(okResult.Value);
            Assert.Equal(2, model.Count());
        }

        [Fact]
        public async Task GetCurrent_Json_BookAsync()
        {
            const string currentBook = "Я, робот";
            var fakeBook = new Книги { Название = currentBook };
            var mockRepository = new Mock<IBookRepository<Книги>>();
            mockRepository.Setup(repo => repo.GetByNameAsync(currentBook)).ReturnsAsync(fakeBook);

            var controller = new BooksController(mockRepository.Object);

            var result = await controller.GetBookByName(currentBook);

            var okResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<Книги>(okResult.Value);
            Assert.Equal(currentBook, model.Название);
        }
    }
}
