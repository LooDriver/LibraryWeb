using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class PickupController : Controller
    {
        private readonly IPickupPointRepository<ПунктыВыдачи> _pickupPointService;
        public PickupController(IPickupPointRepository<ПунктыВыдачи> pickupPointService)
        {
            _pickupPointService = pickupPointService;
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("allPickupPoints")]
        public JsonResult GetPickupPoint() => Json(_pickupPointService.GetAll());
    }
}
