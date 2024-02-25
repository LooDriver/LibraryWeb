using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        DatabaseEntities db;
        public CartController()
        {
            db = new DatabaseEntities();
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("allCartItems")]
        public async Task<IActionResult> GetAllCartItems([FromQuery] int userID)
        {
            db.Корзинаs.Include(x => x.КодКнигиNavigation).Load();
            var userCart = await db.Корзинаs.Include(x => x.КодКнигиNavigation).Where(f => f.КодПользователя == userID).ToListAsync();
            if (userCart is null) return BadRequest();
            return Json(userCart);
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addCartItem")]
        public async Task<IActionResult> AddCartItem([FromQuery] string bookName, int userID)
        {
            Книги книги = await db.Книгиs.FirstAsync(x => x.Название == bookName);
            if (книги is null) return BadRequest();
            else
            {
                Корзина корзина = new Корзина();
                корзина.КодКниги = книги.КодКниги;
                корзина.КодПользователя = userID;
                await db.Корзинаs.AddAsync(корзина);
                await db.SaveChangesAsync();
                return Ok();
            }
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpDelete("deleteCartItem")]
        public async Task<IActionResult> DeleteCartItem([FromQuery] string orderDel)
        {
            Корзина orderDelete = await db.Корзинаs.FindAsync(db.Корзинаs.Include(x => x.КодКнигиNavigation).First(x => x.КодКнигиNavigation.Название == orderDel).КодКорзины);
            if (orderDelete is null) return BadRequest();
            else
            {
                db.Корзинаs.Remove(orderDelete);
                await db.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
