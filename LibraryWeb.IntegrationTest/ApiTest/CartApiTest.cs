using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LibraryWeb.IntegrationTest.ApiTest
{

    public class CartApiTest
    {
        private readonly Mock<ICartRepository<Корзина>> _cartService;

        public CartApiTest()
        {
            _cartService = new Mock<ICartRepository<Корзина>>();
        }

        [Fact]
        public void GetCartList_CartList()
        {
            var fakeCarts = new List<Корзина> { new Корзина { КодКниги = 2, КодПользователя = 1 }, new Корзина { КодКниги = 3, КодПользователя = 1 } };
            var mockRepository = new Mock<ICartRepository<Корзина>>();
            mockRepository.Setup(repo => repo.GetAll(1)).Returns(fakeCarts);

            var controller = new CartController(mockRepository.Object);

            var result = controller.GetAllCartItems(1);

            var okResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Корзина>>(okResult.Value);
            Assert.Equal(2, model.Count());
        }

        [Fact]
        public async Task AddCartItem_CartList()
        {
            var fakeBook = new Книги { КодКниги = 1, Название = "Тест 1", Наличие = 60 };
            var fakeUser = new Пользователи { КодПользователя = 1 };

            var mockRepository = new Mock<ICartRepository<Корзина>>();
            mockRepository.Setup(repo => repo.AddAsync(fakeBook.Название, fakeUser.КодПользователя, 5)).ReturnsAsync(true);

            var controller = new CartController(mockRepository.Object);

            var result = await controller.AddCartItem(fakeBook.Название, fakeUser.КодПользователя, 5);

            var okResult = Assert.IsType<OkResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }
    }
}
