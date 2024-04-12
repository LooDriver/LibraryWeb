using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace LibraryWeb.UnitTests
{
    public class PickupPointUnitTests
    {
        private readonly Mock<IPickupPointRepository<ПунктыВыдачи>> _pickupPointServices;

        private readonly PickupController _pickupPointController;

        public PickupPointUnitTests()
        {
            _pickupPointServices = new Mock<IPickupPointRepository<ПунктыВыдачи>>();
            _pickupPointController = new PickupController(_pickupPointServices.Object);
        }

        [Fact]
        public void GetAllPickupPoint_Json()
        {
            var fakePickupPoint = new List<ПунктыВыдачи> { new ПунктыВыдачи { Адрес = "Test", Название = "1231" } };
            _pickupPointServices.Setup(repo => repo.GetAll(0)).Returns(fakePickupPoint);

            var result = _pickupPointController.GetPickupPoint();

            var okResult = Assert.IsType<JsonResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<ПунктыВыдачи>>(okResult.Value);

            Assert.NotEmpty(model);
            Assert.Single(model);
        }
    }
}
