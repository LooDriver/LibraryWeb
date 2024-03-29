﻿using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        DatabaseEntities db;

        public OrderController()
        {
            db = new DatabaseEntities();
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getOrder")]
        public async Task<IActionResult> GetAllOrders([FromQuery] int userID, CancellationToken cancellationToken = default)
        {
            db.Заказыs.Include(x => x.КодКнигиNavigation).Load();
            var userOrders = await db.Заказыs.AsNoTracking().Include(x => x.КодКнигиNavigation).Where(f => f.КодПользователя == userID).ToListAsync(cancellationToken);
            if (userOrders is null) return BadRequest();
            return Json(userOrders);
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addOrder")]
        public async Task<IActionResult> AddNewOrder([FromForm] string[] bookName, [FromForm] int userID)
        {
            var data = from userBooks in bookName
                       from databaseBooks in db.Книгиs
                       where databaseBooks.Название == userBooks
                       select new Заказы
                       {
                           КодКниги = databaseBooks.КодКниги,
                           КодПользователя = userID,
                           ДатаЗаказа = DateOnly.FromDateTime(DateTime.Now.Date),
                           Статус = "Доставлен"
                       };

            if (data.Any())
            {
                await db.Заказыs.AddRangeAsync(data);
                await db.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
