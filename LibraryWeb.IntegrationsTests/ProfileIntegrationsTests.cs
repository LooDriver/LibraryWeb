using LibraryWeb.IntegrationsTests.SetupEnviroment;
using System.Net;
using System.Net.Http.Headers;

namespace LibraryWeb.IntegrationsTests
{
    public class ProfileIntegrationsTests : IClassFixture<BaseTestServerFixture>
    {
        private readonly BaseTestServerFixture _fixture;

        public ProfileIntegrationsTests(BaseTestServerFixture fixture)
        {
            _fixture = fixture;
        }

        [Theory]
        [InlineData("1")]
        public async Task GetCurrent_ProfileInformation_Async(string userID)
        {
            var response = await _fixture.Client.GetAsync($"/api/profile/profileInformation?userID={userID}");

            var responseBody = await response.Content.ReadAsStringAsync();

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(responseBody);
        }

        [Theory]
        [InlineData("1", "Новое имя", "Новая фамилия", "Новый логин")]
        public async Task Success_UpdateProfile_Async(string userID, string name, string surname, string username)
        {
            var formData = new Dictionary<string, string>
            {
                {"name", name },
                {"surname", surname },
                {"username", username }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync($"/api/profile/editProfile?userID={userID}", content);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Theory]
        [InlineData("", "Новое имя", "Новая фамилия", "Новый логин")]
        public async Task Bad_UpdateProfile_Async(string userID, string name, string surname, string username)
        {
            var formData = new Dictionary<string, string>
            {
                {"name", name },
                {"surname", surname },
                {"username", username }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync($"/api/profile/editProfile?userID={userID}", content);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Theory]
        [InlineData("1", "123456789")]
        public async Task Success_UpdatePassword_Async(string userID, string password)
        {
            var formData = new Dictionary<string, string>
            {
                { "userID", userID },
                { "password", password }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/profile/editPassword", content);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Theory]
        [InlineData("", "123456789")]
        public async Task Bad_UpdatePassword_Async(string userID, string password)
        {
            var formData = new Dictionary<string, string>
            {
                { "userID", userID },
                { "password", password }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/profile/editPassword", content);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
