using LibraryWeb.IntegrationsTests.SetupEnviroment;
using System.Net;
using System.Net.Http.Headers;

namespace LibraryWeb.IntegrationsTests
{
    public class AuthIntegrationsTests : IClassFixture<BaseTestServerFixture>
    {
        private readonly BaseTestServerFixture _fixture;

        public AuthIntegrationsTests(BaseTestServerFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async Task Success_Login_ExistUser_Json_Async()
        {
            var formData = new Dictionary<string, string>
            {
                { "username", "user2" },
                { "password", "password2" }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/auth/login", content);

            string responseBody = await response.Content.ReadAsStringAsync();

            Assert.NotNull(responseBody);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task Unauthorized_Login_NotExist_Json_Async()
        {
            var formData = new Dictionary<string, string>
            {
                { "username", "" },
                { "password", "" }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/auth/login", content);

            string responseBody = await response.Content.ReadAsStringAsync();

            Assert.NotNull(responseBody);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task Success_RegisterNewUser_Async()
        {
            var formData = new Dictionary<string, string>
            {
                {"Имя", "Новый пользователь 1" },
                {"Фамилия", "Новый пользователь 1" },
                {"Логин", "newuser1" },
                {"Пароль", "password123" },
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/auth/register", content);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task Bad_RegisterNewUser_Async()
        {
            var formData = new Dictionary<string, string>
            {
                {"Имя", "Новый пользователь 1" },
                {"Фамилия", "Новый пользователь 1" },
                {"Логин", "" },
                {"Пароль", "" },
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/auth/register", content);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
