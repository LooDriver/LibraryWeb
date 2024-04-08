using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        private readonly ICartRepository<Корзина> _cartService;

        public CartController(ICartRepository<Корзина> cartService)
        {
            _cartService = cartService;
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("existCartItem")]
        public IActionResult CheckExistFavorite([FromQuery] int userID, [FromQuery] string bookName) => (_cartService.CheckExistsCartItem(userID, bookName)) ? Ok() : BadRequest();

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("allCartItems")]
        public IActionResult GetAllCartItems([FromQuery] int userID) => Json(_cartService.GetAll(userID));

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addCartItem")]
        public async Task<IActionResult> AddCartItem([FromForm] string bookName, [FromForm] int userID, [FromForm] int quantity) => (await _cartService.AddAsync(bookName, userID, quantity)) ? Ok() : BadRequest();

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("deleteCartItem")]
        public ActionResult DeleteCartItem([FromForm] string cartItemDelete) => (_cartService.Delete(cartItemDelete)) ? Ok() : BadRequest();

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("clearCart")]
        public IActionResult ClearCartItem([FromForm] int userID) => (_cartService.ClearCart(userID)) ? Ok() : BadRequest();
    }
}
