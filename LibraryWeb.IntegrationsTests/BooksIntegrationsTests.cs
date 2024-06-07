using LibraryWeb.IntegrationsTests.SetupEnviroment;
using LibraryWeb.Sql.Models;
using Newtonsoft.Json;
using System.Net;

namespace LibraryWeb.IntegrationsTests
{
    public class BooksIntegrationsTests : IClassFixture<BaseTestServerFixture>
    {
        // создание обьекта класса BaseTestServerFixture который отвечает за настройку тестового сервера и базы данных
        private readonly BaseTestServerFixture _fixture;

        public BooksIntegrationsTests(BaseTestServerFixture fixture)
        {
            // инициализация обьекта через конструктора класса BooksIntegrationsTests
            _fixture = fixture;
        }

        [Fact]
        public async Task Get_AllBooks_Json_Async()
        {
            // создание переменной response в которую получается значения из контроллера BooksController
            var response = await _fixture.Client.GetAsync("/api/books/allBooks");

            // создание переменной responseBody значения которой мы получаем из переменной response
            var responseBody = await response.Content.ReadAsStringAsync();

            // создание переменной models значения которой мы получаем путем десериализации значения из переменной responseBody
            var models = JsonConvert.DeserializeObject<IEnumerable<Книги>>(responseBody);

            // проверяем что статусный код который содержится в переменной response равен 200 (ОК) 
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            // проверяем что переменная models не пустая
            Assert.NotEmpty(models);
        }

        [Theory]
        [InlineData("Книга 1")]
        public async Task Get_CurrentBook_Json_Async(string bookName)
        {
            // создание переменной response в которую получается значения из контроллера BooksController
            var response = await _fixture.Client.GetAsync($"/api/books?name={bookName}");

            // создание переменной responseBody значения которой мы получаем из переменной response
            var responseBody = await response.Content.ReadAsStringAsync();

            // создание переменной model значения которой мы получаем путем десериализации значения из переменной responseBody
            var model = JsonConvert.DeserializeObject<Книги>(responseBody);

            // проверяем что статусный код который содержится в переменной response равен 200 (ОК)
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            // проверяем что переменная model не содержит значение NULL
            Assert.NotNull(model);
            // проверяем что значение которое мы получили из параметра равно значение которое находится в переменной model
            Assert.Contains(bookName, model.Название);
        }
    }
}