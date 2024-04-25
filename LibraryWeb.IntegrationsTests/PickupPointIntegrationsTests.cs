using LibraryWeb.IntegrationsTests.SetupEnviroment;
using LibraryWeb.Sql.Models;
using Newtonsoft.Json;
using System.Net;

namespace LibraryWeb.IntegrationsTests
{
    public class PickupPointIntegrationsTests : IClassFixture<BaseTestServerFixture>
    {
        private readonly BaseTestServerFixture _fixture;

        public PickupPointIntegrationsTests(BaseTestServerFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async Task GetAll_FavoriteItems_Async()
        {
            var response = await _fixture.Client.GetAsync("/api/pickup/allPickupPoints");

            var responseBody = await response.Content.ReadAsStringAsync();

            var models = JsonConvert.DeserializeObject<List<ПунктыВыдачи>>(responseBody);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotEmpty(models);
        }
    }
}
