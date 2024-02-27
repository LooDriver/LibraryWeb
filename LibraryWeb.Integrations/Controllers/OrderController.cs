using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        DatabaseEntities db;
        bool isClear = false;

        public OrderController()
        {
            db = new DatabaseEntities();
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getOrder")]
        public async Task<IActionResult> GetAllOrders([FromQuery] int userID)
        {
            db.Заказыs.Include(x => x.КодКнигиNavigation).Load();
            var userOrders = await db.Заказыs.Include(x => x.КодКнигиNavigation).Where(f => f.КодПользователя == userID).ToListAsync();
            if (userOrders is null) return BadRequest();
            return Json(userOrders);
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addOrder")]
        public async Task<IActionResult> AddNewOrder([FromQuery] string bookName, int userID)
        {
            Книги книги = await db.Книгиs.FirstOrDefaultAsync(x => x.Название == bookName);
            if (книги is null) return BadRequest();
            else
            {
                Заказы заказ = new Заказы();
                заказ.КодКниги = книги.КодКниги;
                заказ.КодПользователя = userID;
                заказ.ДатаЗаказа = DateOnly.FromDateTime(DateTime.Now.Date);
                заказ.Статус = "Успешно";
                await db.Заказыs.AddAsync(заказ);
                await db.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
