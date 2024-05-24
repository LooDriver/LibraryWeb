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

        public async Task<bool> Add(string bookName, int userID)
        {
            var favoBookData = await _dbContext.Книгиs.SingleOrDefaultAsync(books => books.Название == bookName);
            if (favoBookData is null)
                return false;

            Избранное избранное = new Избранное
            {
                КодКниги = favoBookData.КодКниги,
                КодПользователя = userID
            };

            _dbContext.Избранноеs.Add(избранное);
            _dbContext.SaveChanges();
            return true;
        }

        public bool CheckExistFavorite(int userID, string bookName)
        {
            var userFavoriteBooks = _dbContext.Избранноеs.Where(currentUser => currentUser.КодПользователя == userID && currentUser.КодКнигиNavigation.Название == bookName).Select(usersFavoriteBooks => usersFavoriteBooks);
            return userFavoriteBooks.Any();
        }

        public async Task<bool> Delete(string bookName)
        {
            Избранное bookInFavorite = await _dbContext.Избранноеs.SingleOrDefaultAsync(favoriteBook => favoriteBook.КодКнигиNavigation.Название == bookName);
            if (bookInFavorite is null)
                return false;

            _dbContext.Избранноеs.Remove(bookInFavorite);
            _dbContext.SaveChanges();
            return true;
        }

        public List<Избранное> GetAll(int userID) => [.. _dbContext.Избранноеs.AsNoTracking().Include(books => books.КодКнигиNavigation).Where(user => user.КодПользователя == userID)];
    }
}