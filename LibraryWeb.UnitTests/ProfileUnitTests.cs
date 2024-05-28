using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LibraryWeb.UnitTests
{
    public class ProfileUnitTests
    {
        private readonly Mock<IProfileRepository<Пользователи>> _profileServices;

        private readonly ProfileController _profileController;

        public ProfileUnitTests()
        {
            _profileServices = new Mock<IProfileRepository<Пользователи>>();
            _profileController = new ProfileController(_profileServices.Object);
        }

        [Fact]
        public async Task GetCurrentUser_Json_Async()
        {
            Пользователи fakeUser = new Пользователи
            {
                Фамилия = "Test",
                Имя = "Test",
                Логин = "Test",
                Фото = new byte[5]
            };

            _profileServices.Setup(repo => repo.GetByUserIDAsync(1)).ReturnsAsync(fakeUser);

            var result = await _profileController.GetProfileInformationAsync(1);

            var okResult = Assert.IsType<JsonResult>(result);

            Assert.NotNull(okResult);
        }

        [Fact]
        public async Task Success_EditProfile_Async()
        {
            _profileServices.Setup(repo => repo.EditProfileAsync(1, "Тест имени", "Тест фамилии", "Тест логина")).ReturnsAsync(true);

            var result = await _profileController.UpdateProfileDataAsync(1, "Тест имени", "Тест фамилии", "Тест логина");

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task Bad_EditProfile_Async()
        {
            _profileServices.Setup(repo => repo.EditProfileAsync(1, "Тест имени", "Тест фамилии", "Тест логина")).ReturnsAsync(false);

            var result = await _profileController.UpdateProfileDataAsync(1, "Тест имени", "Тест фамилии", "Тест логина");

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }

        [Fact]
        public async Task Success_EditProfilePhoto_Async()
        {
            _profileServices.Setup(repo => repo.EditProfilePhotoAsync(1, "photo")).ReturnsAsync(true);

            var result = await _profileController.UpdateProfilePhotoAsync(1, "photo");

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task Bad_EditProfilePhoto_Async()
        {
            _profileServices.Setup(repo => repo.EditProfilePhotoAsync(1, "photo")).ReturnsAsync(false);

            var result = await _profileController.UpdateProfilePhotoAsync(1, "photo");

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }

        [Fact]
        public async Task Bad_EditProfilePassword_Async()
        {
            _profileServices.Setup(repo => repo.EditProfilePasswordAsync(1, "newPass")).ReturnsAsync(false);

            var result = await _profileController.UpdateProfilePasswordAsync(1, "newPass");

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }

        [Fact]
        public async Task Success_EditProfilePassword_Async()
        {
            _profileServices.Setup(repo => repo.EditProfilePasswordAsync(1, "newPass")).ReturnsAsync(true);

            var result = await _profileController.UpdateProfilePasswordAsync(1, "newPass");

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }
    }
}
