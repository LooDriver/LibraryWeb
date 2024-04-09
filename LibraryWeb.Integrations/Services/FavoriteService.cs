using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Services
{
    public class FavoriteService : IFavoriteRepository<Избранное>
    {
        private readonly DatabaseEntities _dbContext;

        public FavoriteService(DatabaseEntities dbContext)
        {
            _dbContext = dbContext;
        }

        public bool Add(string bookName, int userID)
        {
            Книги favorBook = _dbContext.Книгиs.Find(_dbContext.Книгиs.FirstOrDefault(books => books.Название == bookName).КодКниги);
            if (favorBook is null) return false;
            else
            {
                Избранное избранное = new Избранное
                {
                    КодКниги = favorBook.КодКниги,
                    КодПользователя = userID
                };
                _dbContext.Избранноеs.Add(избранное);
                _dbContext.SaveChanges();
                return true;
            }
        }

        public bool CheckExistFavorite(int userID, string bookName)
        {
            var userFavoriteBooks = GetAll(userID).Where(books => books.КодКниги == _dbContext.Книгиs.FirstOrDefault(books => books.Название == bookName).КодКниги).Select(usersFavoriteBooks => usersFavoriteBooks);
            if (userFavoriteBooks.Any())
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Delete(string bookName)
        {
            Избранное bookInFavorite = _dbContext.Избранноеs.Where(favoriteBook => favoriteBook.КодКниги == (_dbContext.Книгиs.FirstOrDefault(books => books.Название == bookName).КодКниги)).Single();
            if (bookInFavorite is null) return false;
            else
            {
                _dbContext.Избранноеs.Remove(bookInFavorite);
                _dbContext.SaveChanges();
                return true;
            }
        }

        public List<Избранное> GetAll(int userID = 0) => [.. _dbContext.Избранноеs.AsNoTracking().Include(books => books.КодКнигиNavigation).Where(user => user.КодПользователя == userID)];
    }
}
