using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Services
{
    public class OrderService : IOrderRepository<Заказы>
    {
        private readonly DatabaseEntities _dbContext;

        public OrderService(DatabaseEntities dbContext)
        {
            _dbContext = dbContext;
        }

        public bool Add(string[] bookName, int userID, int pickupPointId)
        {
            var userOrder = from userBooks in bookName
                            from databaseBooks in _dbContext.Книгиs
                            where databaseBooks.Название == userBooks
                            select new Заказы
                            {
                                КодКниги = databaseBooks.КодКниги,
                                КодПользователя = userID,
                                КодПунктаВыдачи = pickupPointId,
                                ДатаЗаказа = DateOnly.FromDateTime(DateTime.Now.Date),
                                Статус = "Доставлен"
                            };

            if (userOrder.Any())
            {
                _dbContext.Заказыs.AddRange(userOrder);
                _dbContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Заказы> GetAll(int userID) => [.. _dbContext.Заказыs.AsNoTracking().Include(pickup => pickup.КодПунктаВыдачиNavigation).Include(books => books.КодКнигиNavigation).Where(user => user.КодПользователя == userID)];
    }
}
