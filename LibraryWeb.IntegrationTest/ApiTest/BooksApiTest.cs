using LibraryWeb.Core;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System.Net;
using Xunit;

namespace LibraryWeb.IntegrationTest.ApiTest
{
    public class BooksApiTest
    {
        private HttpClient _client;

        public BooksApiTest()
        {
            var server = new TestServer(new WebHostBuilder()
                .UseStartup<Startup>());
            _client = server.CreateClient();
        }

        [Theory]
        [InlineData("GET")]
        public async Task BooksGetAllTestAsync(string method)
        {
            var request = new HttpRequestMessage(new HttpMethod(method), "/api/books/allBooks");

            var response = await _client.SendAsync(request);

            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Theory]
        [InlineData("GET", "Идиот")]
        public async Task BooksGetById(string method, string name)
        {
            var request = new HttpRequestMessage(new HttpMethod(method), $"/book/name?{name}");

            var response = await _client.SendAsync(request);

            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
