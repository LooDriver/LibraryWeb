using Azure.Core;
using LibraryWeb.Core;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Numerics;
using Xunit;

namespace LibraryWeb.IntegrationTest.ApiTest
{
    public class AuthenticationApiTest
    {
        private HttpClient _client;
        public AuthenticationApiTest()
        {
            var server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>());
            _client = server.CreateClient();
        }

        [Fact]
        public async Task AuthPostRegisterAsync()
        {
            var users = new
            {
                Логин = "test",
                Пароль = "test123",
                КодРоли = 2
            };
            string json = JsonConvert.SerializeObject(users);
            StringContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            HttpResponseMessage response = await _client.PostAsync("/api/auth/register", httpContent);

            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
