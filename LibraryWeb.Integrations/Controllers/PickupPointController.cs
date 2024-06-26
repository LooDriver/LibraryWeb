﻿               using LibraryWeb.Integrations.Interfaces;
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

        /// <summary>
        /// Метод для получения всех пунктов выдачи
        /// </summary>
        /// <returns>Json обьект пунктов выдачи для их последующей десериализации</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("allPickupPoints")]
        public JsonResult GetPickupPoint() => Json(_pickupPointService.GetAll());
    }
}
