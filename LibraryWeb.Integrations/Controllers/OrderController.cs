using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderRepository<Заказы> _orderService;
        public OrderController(IOrderRepository<Заказы> orderService)
        {
            _orderService = orderService;
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getOrder")]
        public JsonResult GetAllOrders([FromQuery] int userID) => Json(_orderService.GetAll(userID));

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addOrder")]
        public IActionResult AddNewOrder([FromForm] string[] bookName, [FromForm] int userID, [FromForm] int selectedPoint) => (_orderService.Add(bookName, userID, selectedPoint)) ? Ok() : BadRequest();
    }
}
