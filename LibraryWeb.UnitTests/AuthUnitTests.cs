﻿using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LibraryWeb.UnitTests
{
    public class AuthUnitTests
    {
        private readonly Mock<IAuthRepository<Пользователи>> _authServices;

        private readonly AuthController _authController;

        public AuthUnitTests()
        {
            _authServices = new Mock<IAuthRepository<Пользователи>>();
            _authController = new AuthController(_authServices.Object);
        }

        [Fact]
        public async Task SuccessLogin_ExistsUser_Json_Async()
        {
            Пользователи fakeUser = new Пользователи
            {
                Логин = "test123",
                Пароль = "123"
            };

            _authServices.Setup(repo => repo.CheckLoginAsync("test123", "123")).ReturnsAsync(fakeUser);

            var result = await _authController.LoginExistUserAsync("test123", "123");

            var okResult = Assert.IsType<JsonResult>(result);

            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task SuccessRegister_NewUser_Async()
        {

            _authServices.Setup(repo => repo.RegisterUsersAsync("Тест фамилии", "Тест имени", "Тест логина", "Тест пароля", 2)).ReturnsAsync(true);

            var result = await _authController.RegisterUserAsync("Тест фамилии", "Тест имени", "Тест логина", "Тест пароля");

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public async Task BadRegister_NewUser_Async()
        {

            _authServices.Setup(repo => repo.RegisterUsersAsync("Тест фамилии", "Тест имени", "Тест логина", "Тест пароля", 2)).ReturnsAsync(false);

            var result = await _authController.RegisterUserAsync("Тест фамилии", "Тест имени", "Тест логина", "Тест пароля");

            var badResult = Assert.IsType<BadRequestObjectResult>(result);

            Assert.Equal(400, badResult.StatusCode);
            Assert.NotNull(badResult.Value);
        }

        [Fact]
        public async Task BadLogin_ExistsUser_Async()
        {
            Пользователи fakeUser = new Пользователи
            {
                Логин = "",
                Пароль = ""
            };

            _authServices.Setup(repo => repo.CheckLoginAsync("123", "123")).ReturnsAsync(fakeUser);

            var result = await _authController.LoginExistUserAsync("", "");

            var badResult = Assert.IsType<UnauthorizedObjectResult>(result);

            Assert.Equal(401, badResult.StatusCode);
            Assert.NotNull(badResult.Value);
        }
    }
}
