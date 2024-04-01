using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Services
{
    public class ProfileService : IProfileRepository<Пользователи>
    {

        private readonly DatabaseEntities _dbContext;

        public ProfileService(DatabaseEntities dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> EditProfileAsync(int userID, Пользователи пользователи)
        {
            Пользователи userProfile = await _dbContext.Пользователиs.FirstOrDefaultAsync(f => f.КодПользователя == userID);
            if (userProfile is null) return false;
            else
            {
                userProfile.Фамилия = пользователи.Фамилия;
                userProfile.Имя = пользователи.Имя;
                userProfile.Логин = пользователи.Логин;
                await _dbContext.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> EditProfilePasswordAsync(int userID, string newPassword)
        {
            Пользователи userProfile = await _dbContext.Пользователиs.FirstOrDefaultAsync(f => f.КодПользователя == userID);
            if (userProfile is null) return false;
            else
            {
                userProfile.Пароль = newPassword;
                await _dbContext.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> EditProfilePhotoAsync(int userID, string newPhoto)
        {
            Пользователи userProfile = await _dbContext.Пользователиs.FirstOrDefaultAsync(f => f.КодПользователя == userID);
            if (userProfile is null || newPhoto.Length == 0) return false;
            userProfile.Фото = Convert.FromBase64String(newPhoto);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public List<Пользователи> GetAll(int userID = 0)
        {
            throw new NotImplementedException();
        }

        public async Task<Пользователи> GetById(int userID) => await _dbContext.Пользователиs.AsNoTracking().FirstAsync(user => user.КодПользователя == userID);
    }
}
