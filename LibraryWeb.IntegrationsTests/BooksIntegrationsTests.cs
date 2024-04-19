using LibraryWeb.IntegrationsTests.SetupEnviroment;
using LibraryWeb.Sql.Models;
using Newtonsoft.Json;
using System.Net;

namespace LibraryWeb.IntegrationsTests
{
    public class BooksIntegrationsTests : IClassFixture<BaseTestServerFixture>
    {
        private readonly BaseTestServerFixture _fixture;

        public BooksIntegrationsTests(BaseTestServerFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async Task Get_AllBooks_Json_Async()
        {
            var response = await _fixture.Client.GetAsync("/api/books/allBooks");

            var responseBody = await response.Content.ReadAsStringAsync();

            var models = JsonConvert.DeserializeObject<IEnumerable<Книги>>(responseBody);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotEmpty(models);
        }

        [InlineData("Книга 1")]
        [Theory]
        public async Task Get_CurrentBook_Json_Async(string bookName)
        {
            var response = await _fixture.Client.GetAsync($"/api/books?name={bookName}");

            var responseBody = await response.Content.ReadAsStringAsync();

            var model = JsonConvert.DeserializeObject<Книги>(responseBody);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(model);
            Assert.Contains(bookName, model.Название);
        }
    }
}