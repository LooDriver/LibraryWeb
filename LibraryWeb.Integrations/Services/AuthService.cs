using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Services
{
    public class AuthService : IAuthRepository<Пользователи>
    {
        private readonly DatabaseEntities _dbContext;

        public AuthService(DatabaseEntities dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Пользователи> CheckLogin(string username, string password)
        {
            Пользователи usersExists = await _dbContext.Пользователиs.FirstOrDefaultAsync(logins => logins.Логин == username && logins.Пароль == password);
            if (usersExists is null) { return null; }
            else
            {
                return usersExists;
            }
        }

        public async Task<bool> RegisterUsers(string surname, string name, string username, string password, int role = 2)
        {
            if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
            {
                await _dbContext.Пользователиs.AddAsync(new Пользователи { КодРоли = role, Имя = name, Фамилия = surname, Логин = username, Пароль = password });
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
