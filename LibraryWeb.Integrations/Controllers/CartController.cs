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

        /// <summary>
        /// Метод для проверки на наличие книги в корзине
        /// </summary>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <param name="bookName">Название книги</param>
        /// <returns>OK, если книга уже находится в корзине пользователя, BadRequest если данной книги нету в корзине</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("existCartItem")]
        public IActionResult CheckExistCart([FromQuery] int userID, [FromQuery] string bookName) => (_cartService.CheckExistsCartItem(userID, bookName)) ? Ok() : BadRequest();

        /// <summary>
        /// Метод для получения всех книг в корзине
        /// </summary>
        /// <param name="userID">Уникальный номер пользовател</param>
        /// <returns>Json обьект книг находящихся в корзине для последующей десериализации</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("allCartItems")]
        public IActionResult GetAllCartItems([FromQuery] int userID) => Json(_cartService.GetAll(userID));

        /// <summary>
        /// Метод для добавления книги в корзину пользователя
        /// </summary>
        /// <param name="bookName">Название книги</param>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <param name="quantity">Количество книг</param>
        /// <returns>OK, если книга успешно добавлена в корзину, BadRequest если возникли ошибки при добавлении</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("addCartItem")]
        public async Task<IActionResult> AddCartItem([FromForm] string bookName, [FromForm] int userID, [FromForm] int quantity) => (await _cartService.AddAsync(bookName, userID, quantity)) ? Ok() : BadRequest();

        /// <summary>
        /// Метод для удаление книги из корзины
        /// </summary>
        /// <param name="cartItemDelete">Название книги для удаления</param>
        /// <returns>OK, если книга успешно удалена из корзины, BadRequest если возникли ошибки при удалении</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("deleteCartItem")]
        public IActionResult DeleteCartItem([FromForm] string cartItemDelete) => (_cartService.Delete(cartItemDelete)) ? Ok() : BadRequest();

        /// <summary>
        /// Метод для полной очистки корзины у пользователя
        /// </summary>
        /// <param name="userID">Уникальный номер пользователя</param>
        /// <returns>OK, если корзина была успешна очищена, BadRequest если возникли ошибки при очистки корзины</returns>
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpPost("clearCart")]
        public IActionResult ClearCartItem([FromForm] int userID) => (_cartService.ClearCart(userID)) ? Ok() : BadRequest();
    }
}
