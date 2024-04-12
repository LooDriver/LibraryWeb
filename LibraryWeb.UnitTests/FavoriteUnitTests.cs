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
        public void Success_AddCartItem()
        {
            var fakeBook = new Книги { КодКниги = 1, Название = "Тест 1", Наличие = 60 };

            _favoriteServices.Setup(repo => repo.Add(fakeBook.Название, 1)).Returns(true);

            var result = _favoriteController.AddNewFavorite(fakeBook.Название, 1);

            var okResult = Assert.IsType<OkResult>(result);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public void Bad_Add_FavoriteItem()
        {
            _favoriteServices.Setup(repo => repo.Add("Тест 1", 1)).Returns(false);

            var result = _favoriteController.AddNewFavorite("Тест 1", 1);

            var badResult = Assert.IsType<BadRequestResult>(result);
            Assert.Equal(400, badResult.StatusCode);
        }

        [Fact]
        public void Success_Remove_FavoriteItem()
        {
            _favoriteServices.Setup(repo => repo.Delete("Тест 1")).Returns(true);

            var result = _favoriteController.RemoveExistFavorite("Тест 1");

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public void Bad_RemoveCartItem()
        {
            _favoriteServices.Setup(repo => repo.Delete("Тест 1")).Returns(false);

            var result = _favoriteController.RemoveExistFavorite("Тест 1");

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }
    }
}
