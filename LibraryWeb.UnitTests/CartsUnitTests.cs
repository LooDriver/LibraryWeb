using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LibraryWeb.UnitTests
{

    public class CartsUnitTests
    {
        private readonly Mock<ICartRepository<Корзина>> _cartService;

        private readonly CartController _cartController;

        public CartsUnitTests()
        {
            _cartService = new Mock<ICartRepository<Корзина>>();
            _cartController = new CartController(_cartService.Object);
        }

        [Fact]
        public void GetCartList_Json()
        {
            var fakeCarts = new List<Корзина> { new Корзина { КодКниги = 2, КодПользователя = 1 } };
            _cartService.Setup(repo => repo.GetAll(1)).Returns(fakeCarts);

            var result = _cartController.GetAllCartItems(1);

            var okResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Корзина>>(okResult.Value);

            Assert.NotEmpty(model);
            Assert.Single(model);
        }

        [Fact]
        public async Task Success_Add_CartItem_Async()
        {
            _cartService.Setup(repo => repo.AddAsync("Тест 1", 1, 5)).ReturnsAsync(true);

            var result = await _cartController.AddCartItem("Тест 1", 1, 5);

            var okResult = Assert.IsType<OkResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task Bad_Add_CartItem_Async()
        {
            _cartService.Setup(repo => repo.AddAsync("Тест 1", 1, 5)).ReturnsAsync(false);

            var result = await _cartController.AddCartItem("Тест 1", 1, 5);

            var badResult = Assert.IsType<BadRequestResult>(result);
            Assert.Equal(400, badResult.StatusCode);
        }

        [Fact]
        public void Success_Remove_CartItem()
        {
            _cartService.Setup(repo => repo.Delete("Test")).Returns(true);

            var result = _cartController.DeleteCartItem("Test");

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public void Bad_Remove_CartItem()
        {
            _cartService.Setup(repo => repo.Delete("Test")).Returns(false);

            var result = _cartController.DeleteCartItem("Test");

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }

        [Fact]
        public void Success_Clear_CartItems()
        {
            _cartService.Setup(repo => repo.ClearCart(1)).Returns(true);

            var result = _cartController.ClearCartItem(1);

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public void Bad_Clear_CartItems()
        {
            _cartService.Setup(repo => repo.ClearCart(1)).Returns(false);

            var result = _cartController.ClearCartItem(1);

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }

        [Fact]
        public void Success_Exists_CartItem()
        {
            _cartService.Setup(repo => repo.CheckExistsCartItem(1, "Test")).Returns(true);

            var result = _cartController.CheckExistCart(1, "Test");

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public void Bad_Exists_CartItem()
        {
            _cartService.Setup(repo => repo.CheckExistsCartItem(1, "Test")).Returns(false);

            var result = _cartController.CheckExistCart(1, "Test");

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }
    }
}
