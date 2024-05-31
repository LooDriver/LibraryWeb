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

        /// <summary>
        /// Метод для получения всех заказов пользователя
        /// </summary>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <returns>Json обьект заказов пользователя для их последующей десериализации</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getOrder")]
        public JsonResult GetAllOrders([FromQuery] int userID) => Json(_orderService.GetAll(userID));

        /// <summary>
        /// Метод для добавления книги в заказы
        /// </summary>
        /// <param name="bookName">Список книг</param>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <param name="selectedPoint">Выбранный пункт выдачи</param>
        /// <returns>OK, если книга успешно добавлена в заказы, BadRequest если возникли ошибки при добавлении</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addOrder")]
        public IActionResult AddNewOrder([FromForm] string[] bookName, [FromForm] int userID, [FromForm] int selectedPoint) => (_orderService.Add(bookName, userID, selectedPoint)) ? Ok() : BadRequest();
    }
}
