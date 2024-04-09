using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Services
{
    public class CommentService : ICommentsRepository<Комментарии>
    {
        private readonly DatabaseEntities _dbContext;

        public CommentService(DatabaseEntities dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> AddNewCommentAsync(string comment, int userID, string bookName)
        {
            var book = _dbContext.Книгиs.FirstOrDefault(books => books.Название == bookName);
            if (book is null) return false;
            else
            {
                Комментарии комментарии = new Комментарии
                {
                    КодКниги = book.КодКниги,
                    КодПользователя = userID,
                    ТекстКомментария = comment
                };
                await _dbContext.Комментарииs.AddAsync(комментарии);
                await _dbContext.SaveChangesAsync();
                return true;
            }
        }

        public List<Комментарии> GetAll(string bookName) => [.. _dbContext.Комментарииs.Include(users => users.КодПользователяNavigation).Where(books => books.КодКнигиNavigation.Название == bookName).Select(comment => comment)];

        public List<Комментарии> GetAll(int userID = 0)
        {
            throw new NotImplementedException();
        }
    }
}
