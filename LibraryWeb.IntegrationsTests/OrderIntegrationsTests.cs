using LibraryWeb.IntegrationsTests.SetupEnviroment;
using LibraryWeb.Sql.Models;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;

namespace LibraryWeb.IntegrationsTests
{
    public class OrderIntegrationsTests : IClassFixture<BaseTestServerFixture>
    {
        private readonly BaseTestServerFixture _fixture;

        public OrderIntegrationsTests(BaseTestServerFixture fixture)
        {
            _fixture = fixture;
        }

        [Theory]
        [InlineData("1")]
        public async Task GetAll_OrderItems_Async(string userID)
        {
            var response = await _fixture.Client.GetAsync($"/api/order/getOrder?userID={userID}");

            var reponseBody = await response.Content.ReadAsStringAsync();

            var models = JsonConvert.DeserializeObject<List<Заказы>>(reponseBody);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotEmpty(models);
        }

        [Theory]
        [InlineData(new string[] { "Книга 1" }, "1", "1")]
        public async Task Success_AddNew_OrderItem(string[] bookName, string userID, string selectedPickupPoint)
        {
            var formData = new Dictionary<string, string>
            {
                {"bookName", bookName.Single() },
                {"userID", userID },
                {"selectedPoint", selectedPickupPoint}
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/order/addOrder", content);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Theory]
        [InlineData(new string[] { "" }, "1", "1")]
        public async Task Bad_AddNew_OrderItem(string[] bookName, string userID, string selectedPickupPoint)
        {
            var formData = new Dictionary<string, string>
            {
                {"bookName", bookName.Single() },
                {"userID", userID },
                {"selectedPoint", selectedPickupPoint}
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/order/addOrder", content);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
