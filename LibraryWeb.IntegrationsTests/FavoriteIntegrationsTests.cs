using LibraryWeb.IntegrationsTests.SetupEnviroment;
using LibraryWeb.Sql.Models;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;

namespace LibraryWeb.IntegrationsTests
{
    public class FavoriteIntegrationsTests : IClassFixture<BaseTestServerFixture>
    {
        private readonly BaseTestServerFixture _fixture;

        public FavoriteIntegrationsTests(BaseTestServerFixture fixture)
        {
            _fixture = fixture;
        }

        [Theory]
        [InlineData("1")]
        public async Task GetAll_FavoriteItems_Json_Async(string userID)
        {
            var response = await _fixture.Client.GetAsync($"/api/favorite/getFavorite?userID={userID}");

            var responseBody = await response.Content.ReadAsStringAsync();

            var favoriteItems = JsonConvert.DeserializeObject<List<Избранное>>(responseBody);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotEmpty(favoriteItems);
        }

        [Theory]
        [InlineData("1", "Книга 1")]
        public async Task Success_AddNew_FavoriteItem_Async(string userID, string bookName)
        {
            var formData = new Dictionary<string, string>
            {
                {"nameBook", bookName},
                {"userID", userID }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/favorite/addFavorite", content);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Theory]
        [InlineData("1", "NotExistBook")]
        public async Task Bad_AddNew_FavoriteItem_Async(string userID, string bookName)
        {
            var formData = new Dictionary<string, string>
            {
                {"nameBook", bookName},
                {"userID", userID }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/favorite/addFavorite", content);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
