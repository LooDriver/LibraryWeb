using LibraryWeb.Core;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using System.Net;
using Xunit;

namespace LibraryWeb.IntegrationTest
{
    public class Class1
    {
        private HttpClient _client;

        public Class1()
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
    }
}
