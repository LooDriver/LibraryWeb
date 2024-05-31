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

        public async Task<Пользователи> CheckLoginAsync(string username, string password)
        {
            Пользователи usersExists = await _dbContext.Пользователиs.FirstOrDefaultAsync(logins => logins.Логин == username && logins.Пароль == password);
            return usersExists ?? null;
        }

        public async Task<bool> RegisterUsersAsync(string surname, string name, string username, string password, int role = 2)
        {
            if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
            {
                await _dbContext.Пользователиs.AddAsync(new Пользователи { КодРоли = role, Имя = name, Фамилия = surname, Логин = username, Пароль = password });
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> ValidationRecoveryAccount(string username)
        {
            Пользователи recoveryAccount = await _dbContext.Пользователиs.FirstOrDefaultAsync(user => user.Логин == username);
            return recoveryAccount is not null;
        }
        public async Task<bool> RecoveryAccountAsync(string username, string newPassword)
        {
            Пользователи recoveryAccount = await _dbContext.Пользователиs.FirstOrDefaultAsync(user => user.Логин == username);
            if (recoveryAccount is not null)
            {
                recoveryAccount.Пароль = newPassword;
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}