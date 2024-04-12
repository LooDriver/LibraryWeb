using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LibraryWeb.UnitTests
{
    public class BooksUnitTests
    {
        private readonly Mock<IBookRepository<Книги>> _booksService;

        private readonly BooksController _booksController;

        public BooksUnitTests()
        {
            _booksService = new Mock<IBookRepository<Книги>>();
            _booksController = new BooksController(_booksService.Object);
        }

        [Fact]
        public void GetBooksList_Json_BooksList()
        {
            var fakeBooks = new List<Книги> { new Книги { Название = "Book 1" } };
            _booksService.Setup(repo => repo.GetAll(0)).Returns(fakeBooks);

            var result = _booksController.GetBooks();

            var okResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Книги>>(okResult.Value);

            Assert.NotEmpty(model);
            Assert.Single(model);
        }

        [Fact]
        public async Task GetCurrent_Json_BookAsync()
        {
            const string currentBook = "Книга 1";
            var fakeBook = new Книги { Название = currentBook };
            _booksService.Setup(repo => repo.GetByNameAsync(currentBook)).ReturnsAsync(fakeBook);

            var result = await _booksController.GetBookByName(currentBook);

            var okResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<Книги>(okResult.Value);

            Assert.Equal(currentBook, model.Название);
        }
    }
}
