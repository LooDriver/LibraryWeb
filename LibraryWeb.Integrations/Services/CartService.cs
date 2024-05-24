using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Services
{
    public class CartService : ICartRepository<Корзина>
    {
        private readonly DatabaseEntities _dbContext;

        public CartService(DatabaseEntities dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddAsync(string bookName, int userID, int quantity)
        {
            Книги книги = await _dbContext.Книгиs.SingleOrDefaultAsync(x => x.Название == bookName);
            if (книги is null) return false;
            else
            {
                книги.Наличие -= quantity;
                Корзина корзина = new()
                {
                    КодКниги = книги.КодКниги,
                    КодПользователя = userID,
                    Количество = quantity
                };

                await _dbContext.Корзинаs.AddAsync(корзина);
                await _dbContext.SaveChangesAsync();
                return true;
            }
        }

        public bool ClearCart(int userID)
        {
            var userCart = _dbContext.Корзинаs.Where(user => user.КодПользователя == userID).Select(cartItems => cartItems);
            if (userCart.Any())
            {
                _dbContext.Корзинаs.RemoveRange(userCart);
                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }

        public bool Delete(string cartItemDelete)
        {
            var cartDelete = _dbContext.Корзинаs.SingleOrDefault(cart => cart.КодКнигиNavigation.Название == cartItemDelete);
            if (cartDelete is null)
                return false;

            var book = _dbContext.Книгиs.SingleOrDefault(b => b.КодКниги == cartDelete.КодКниги);
            if (book is null)
                return false;

            book.Наличие += cartDelete.Количество;
            _dbContext.Корзинаs.Remove(cartDelete);

            _dbContext.SaveChanges();
            return true;
        }

        public bool CheckExistsCartItem(int userID, string bookName)
        {
            var userOrderList = _dbContext.Корзинаs.Where(currentUser => currentUser.КодПользователя == userID && currentUser.КодКнигиNavigation.Название == bookName).Select(userOrder => userOrder);
            return userOrderList.Any();
        }

        public List<Корзина> GetAll(int userID) => [.. _dbContext.Корзинаs.AsNoTracking().Include(books => books.КодКнигиNavigation).Where(user => user.КодПользователя == userID)];
    }
}