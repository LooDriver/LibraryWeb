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
        // создание "фейкового" обьекта сервиса книг
        private readonly Mock<IBookRepository<Книги>> _booksService;

        // создание обьекта контроллера книг
        private readonly BooksController _booksController;

        public BooksUnitTests()
        {
            // инициализация "фейкового" обьекта сервиса книг
            _booksService = new Mock<IBookRepository<Книги>>(); 

            // инициализация обьекта контроллера книг и передача "фейкового" обьекта сервиса
            _booksController = new BooksController(_booksService.Object); 
        }

        [Fact]
        public void GetBooksList_Json_BooksList()
        {
            // создание "фейкового" списка с книгой
            var fakeBooks = new List<Книги> { new Книги { Название = "Book 1" } };
            // настройка "фейкового" сервиса книги чтобы он возвращал список переменной fakeBooks
            _booksService.Setup(repo => repo.GetAll()).Returns(fakeBooks);

            // вызов метода из контроллера для получения всех книг
            var result = _booksController.GetBooks();

            // проверяем что обьект типа JsonResult
            var okResult = Assert.IsType<JsonResult>(result);
            // проверяем что переменной model можно присвоить тип перечисляемой коллекции книг
            var model = Assert.IsAssignableFrom<IEnumerable<Книги>>(okResult.Value);

            // проверяем что значения в переменной model не пустые
            Assert.NotEmpty(model);
            // проверяем что в переменной model содержиться только одно значение
            Assert.Single(model);
        }

        [Fact]
        public async Task GetCurrent_Json_BookAsync()
        {
            // создание строковой константы которая содержит тестовое название книги
            const string currentBook = "Книга 1";
            // создание "фейкового" обьекта книги
            var fakeBook = new Книги { Название = currentBook };
            // настройка "фейкового" сервиса книги чтобы он возвращал название книги из константы currentBook в переменную fakeBooks
            _booksService.Setup(repo => repo.GetByNameAsync(currentBook)).ReturnsAsync(fakeBook);

            // вызов метода из контроллера для получение конкретной книги по ее названию
            var result = await _booksController.GetBookByNameAsync(currentBook);

            // проверяем что обьект типа JsonResult
            var okResult = Assert.IsType<JsonResult>(result);
            // проверяем что переменной model можно присвоить тип обьекта книги
            var model = Assert.IsAssignableFrom<Книги>(okResult.Value);

            // проверяем что строковая константа переменной currentBook равна значению которое находится в переменной model
            Assert.Equal(currentBook, model.Название);
        }
    }
}
