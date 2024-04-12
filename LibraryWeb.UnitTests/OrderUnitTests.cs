using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LibraryWeb.UnitTests
{
    public class OrderUnitTests
    {
        private readonly Mock<IOrderRepository<Заказы>> _orderServices;

        private readonly OrderController _orderController;

        public OrderUnitTests()
        {
            _orderServices = new Mock<IOrderRepository<Заказы>>();
            _orderController = new OrderController(_orderServices.Object);
        }

        [Fact]
        public void GetOrderList_Json()
        {
            var fakeOrder = new List<Заказы> { new Заказы { КодКниги = 1, КодПунктаВыдачи = 2, Статус = "Test" } };
            _orderServices.Setup(repo => repo.GetAll(1)).Returns(fakeOrder);

            var result = _orderController.GetAllOrders(1);

            var okResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<Заказы>>(okResult.Value);

            Assert.NotEmpty(model);
            Assert.Single(model);
        }

        [Fact]
        public void Success_Add_OrderItem()
        {
            _orderServices.Setup(repo => repo.Add(new string[] { "Test" }, 1, 2)).Returns(true);

            var result = _orderController.AddNewOrder(["Test"], 1, 2);

            var okResult = Assert.IsType<OkResult>(result);

            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public void Bad_Add_OrderItem()
        {
            _orderServices.Setup(repo => repo.Add(new string[] { "Test" }, 1, 2)).Returns(false);

            var result = _orderController.AddNewOrder(["Test"], 1, 2);

            var badResult = Assert.IsType<BadRequestResult>(result);

            Assert.Equal(400, badResult.StatusCode);
        }
    }
}
