using LibraryWeb.IntegrationsTests.SetupEnviroment;
using LibraryWeb.Sql.Models;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;

namespace LibraryWeb.IntegrationsTests
{
    public class CommentIntegrationsTests : IClassFixture<BaseTestServerFixture>
    {
        private readonly BaseTestServerFixture _fixture;

        public CommentIntegrationsTests(BaseTestServerFixture fixture)
        {
            _fixture = fixture;
        }

        [Theory]
        [InlineData("Книга 1")]
        public async Task GetAll_Comments_Json_Async(string bookName)
        {
            var response = await _fixture.Client.GetAsync($"/api/comment/getAllComments?bookName={bookName}");

            var responseBody = await response.Content.ReadAsStringAsync();

            var commentItems = JsonConvert.DeserializeObject<List<Комментарии>>(responseBody);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotEmpty(commentItems);
        }

        [Theory]
        [InlineData("Новый комментарии", "1", "Книга 1")]
        public async Task Success_AddNew_Comment_Async(string comment, string userID, string bookName)
        {
            var formData = new Dictionary<string, string>
            {
                {"comment", comment },
                {"user", userID },
                {"bookName", bookName }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/comment/addComment", content);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Theory]
        [InlineData("Новый комментарии", "1", "")]
        public async Task Bad_AddNew_Comment_Async(string comment, string userID, string bookName)
        {
            var formData = new Dictionary<string, string>
            {
                {"comment", comment },
                {"user", userID },
                {"bookName", bookName }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/comment/addComment", content);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
