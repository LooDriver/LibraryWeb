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
        public async Task<IActionResult> GetAllCartItems([FromQuery] int userID, CancellationToken cancellationToken = default)
        {
            db.Корзинаs.Include(x => x.КодКнигиNavigation).Load();
            var userCart = await db.Корзинаs.AsNoTracking().Include(x => x.КодКнигиNavigation).Where(f => f.КодПользователя == userID).ToListAsync(cancellationToken);
            if (userCart is null) return BadRequest();
            return Json(userCart);
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addCartItem")]
        public async Task<IActionResult> AddCartItem([FromForm] string bookName, [FromForm] int userID, [FromForm] int quantity)
        {
            Книги книги = await db.Книгиs.FirstOrDefaultAsync(x => x.Название == bookName);
            if (книги is null) return BadRequest();
            else
            {
                книги.Наличие -= quantity;
                Корзина корзина = new Корзина();
                корзина.КодКниги = книги.КодКниги;
                корзина.КодПользователя = userID;
                корзина.Количество = quantity;
                await db.Корзинаs.AddAsync(корзина);
                await db.SaveChangesAsync();
                return Ok();
            }
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("deleteCartItem")]
        public async Task<IActionResult> DeleteCartItem([FromForm] string orderDel, CancellationToken cancellationToken = default)
        {
            var cartDelete = await db.Корзинаs.FirstOrDefaultAsync(x => x.КодКнигиNavigation.Название == orderDel, cancellationToken);
            if (cartDelete is null) return BadRequest("Данного товара нету в корзине");
            else
            {
                db.Корзинаs.RemoveRange(cartDelete);
                await db.SaveChangesAsync();
                return Ok("Товар был успешно удален из корзины");
            }
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("clearCart")]
        public async Task<IActionResult> ClearCartItem([FromForm] int userID)
        {
            var item = from p in db.Корзинаs
                       where p.КодПользователя == userID
                       select p;
            if (item.Any())
            {
                db.Корзинаs.RemoveRange(item);
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
