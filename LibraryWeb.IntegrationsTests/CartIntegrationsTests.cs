using LibraryWeb.IntegrationsTests.SetupEnviroment;
using LibraryWeb.Sql.Models;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;

namespace LibraryWeb.IntegrationsTests
{
    public class CartIntegrationsTests : IClassFixture<BaseTestServerFixture>
    {
        private readonly BaseTestServerFixture _fixture;

        public CartIntegrationsTests(BaseTestServerFixture fixture)
        {
            _fixture = fixture;
        }

        [InlineData("3")]
        [Theory]
        public async Task GetAll_CartItems_Json_Async(string userID)
        {
            var response = await _fixture.Client.GetAsync($"/api/cart/allCartItems?userID={userID}");

            var responseBody = await response.Content.ReadAsStringAsync();

            var cartItems = JsonConvert.DeserializeObject<List<Корзина>>(responseBody);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotEmpty(cartItems);
        }

        [InlineData("3", "Книга 1")]
        [Theory]
        public async Task Success_CheckExist_CartItem_Async(string userID, string bookName)
        {
            var response = await _fixture.Client.GetAsync($"/api/cart/existCartItem?userID={userID}&bookName={bookName}");

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [InlineData("5", "Книга 1")]
        [Theory]
        public async Task Bad_CheckExist_CartItem_Async(string userID, string bookName)
        {
            var response = await _fixture.Client.GetAsync($"/api/cart/existCartItem?userID={userID}&bookName={bookName}");

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [InlineData("Книга 1", "2", "1")]
        [Theory]
        public async Task Success_AddNew_CartItem_Async(string bookName, string userID, string quantity)
        {
            var formData = new Dictionary<string, string>
            {
                {"bookName", bookName },
                {"userID", userID },
                {"quantity", quantity}
            };

            await TestAddCartItem(formData, HttpStatusCode.OK);
        }

        [InlineData("", "", "")]
        [Theory]
        public async Task Bad_AddNew_CartItem_Async(string bookName, string userID, string quantity)
        {
            var formData = new Dictionary<string, string>
            {
                {"bookName", bookName },
                {"userID", userID },
                {"quantity", quantity}
            };

            await TestAddCartItem(formData, HttpStatusCode.BadRequest);
        }

        [InlineData("Книга 1")]
        [Theory]
        public async Task Success_DeleteExist_CartItem_Async(string bookName)
        {
            var formData = new Dictionary<string, string>
            {
                {"cartItemDelete", bookName }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/cart/deleteCartItem", content);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [InlineData("NotExistBook")]
        [Theory]
        public async Task Bad_DeleteNotExist_CartItem_Async(string bookName)
        {
            var formData = new Dictionary<string, string>
            {
                {"cartItemDelete", bookName }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/cart/deleteCartItem", content);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [InlineData("2")]
        [Theory]
        public async Task Success_Clear_CartItems_Async(string userID)
        {
            var formData = new Dictionary<string, string>
            {
                {"userID", userID }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/cart/clearCart", content);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [InlineData("-1")]
        [Theory]
        public async Task Bad_Clear_CartItems_Async(string userID)
        {
            var formData = new Dictionary<string, string>
            {
                {"userID", userID }
            };

            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync("/api/cart/clearCart", content);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        private async Task TestAddCartItem(Dictionary<string, string> formData, HttpStatusCode expectedStatusCode)
        {
            var content = new FormUrlEncodedContent(formData);

            content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

            var response = await _fixture.Client.PostAsync($"/api/cart/addCartItem", content);

            Assert.Equal(expectedStatusCode, response.StatusCode);
        }
    }
}
