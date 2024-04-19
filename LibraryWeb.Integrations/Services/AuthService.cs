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

        public async Task<Пользователи> CheckLogin(Пользователи logins)
        {
            Пользователи usersExists = await _dbContext.Пользователиs.FirstOrDefaultAsync(x => x.Логин == logins.Логин && x.Пароль == logins.Пароль);
            if (usersExists is null) { return null; }
            else
            {
                return usersExists;
            }
        }

        public List<Пользователи> GetAll(int userID = 0)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> RegisterUsers(Пользователи registers)
        {
            if (!string.IsNullOrEmpty(registers.Логин) && !string.IsNullOrEmpty(registers.Пароль))
            {
                await _dbContext.Пользователиs.AddAsync(registers);
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
