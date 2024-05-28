using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LibraryWeb.UnitTests
{
    public class FavoriteUnitTests
    {
        private readonly Mock<IFavoriteRepository<Избранное>> _favoriteServices;

        private readonly FavoriteController _favoriteController;

        public FavoriteUnitTests()
        {
            _favoriteServices = new Mock<IFavoriteRepository<Избранное>>();
            _favoriteController = new FavoriteController(_favoriteServices.Object);
        }

        [Fact]
        public void GetAllFavorite_Json()
        {
            var fakeFavorite = new List<Избранное> { new Избранное { КодКниги = 1, КодПользователя = 2 } };

            _favoriteServices.Setup(repo => repo.GetAll(1)).Returns(fakeFavorite);

            var result = _favoriteController.GetAllFavorite(1);

            var okResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Избранное>>(okResult.Value);

            Assert.NotEmpty(model);
            Assert.Single(model);
        }

        [Fact]
        public void Success_Exists_FavoriteItem()
        {
            _favoriteServices.Setup(repo => repo.CheckExistFavorite(1, "Test")).Returns(true);

            var result = _favoriteController.CheckExistFavorite(1, "Test");

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public void Bad_Exists_FavoriteItem()
        {
            _favoriteServices.Setup(repo => repo.CheckExistFavorite(1, "Test")).Returns(false);

            var result = _favoriteController.CheckExistFavorite(1, "Test");

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }

        [Fact]
        public async Task Success_AddCartItem_Async()
        {
            var fakeBook = new Книги { КодКниги = 1, Название = "Тест 1", Наличие = 60 };

            _favoriteServices.Setup(repo => repo.AddFavoriteBookAsync(fakeBook.Название, 1)).ReturnsAsync(true);

            var result = await _favoriteController.AddNewFavoriteAsync(fakeBook.Название, 1);

            var okResult = Assert.IsType<OkResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task Bad_Add_FavoriteItem_Async()
        {
            _favoriteServices.Setup(repo => repo.AddFavoriteBookAsync("Тест 1", 1)).ReturnsAsync(false);

            var result = await _favoriteController.AddNewFavoriteAsync("Тест 1", 1);

            var badResult = Assert.IsType<BadRequestResult>(result);
            Assert.Equal(400, badResult.StatusCode);
        }

        [Fact]
        public async Task Success_Remove_FavoriteItem_Async()
        {
            _favoriteServices.Setup(repo => repo.DeleteFavoriteBookAsync("Тест 1")).ReturnsAsync(true);

            var result = await _favoriteController.RemoveExistFavoriteAsync("Тест 1");

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task Bad_RemoveCartItem_Async()
        {
            _favoriteServices.Setup(repo => repo.DeleteFavoriteBookAsync("Тест 1")).ReturnsAsync(false);

            var result = await _favoriteController.RemoveExistFavoriteAsync("Тест 1");

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }
    }
}
