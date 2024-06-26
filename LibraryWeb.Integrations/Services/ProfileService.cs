﻿using LibraryWeb.Integrations.Interfaces;
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

        public async Task<bool> EditProfileAsync(int userID, string name, string surname, string username)
        {
            Пользователи userProfile = await _dbContext.Пользователиs.SingleOrDefaultAsync(user => user.КодПользователя == userID);
            if (userProfile is null)
                return false;

            userProfile.Фамилия = surname;
            userProfile.Имя = name;
            userProfile.Логин = username;
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> EditProfilePasswordAsync(int userID, string newPassword)
        {
            Пользователи userProfile = await _dbContext.Пользователиs.SingleOrDefaultAsync(user => user.КодПользователя == userID);
            if (userProfile is null)
                return false;

            userProfile.Пароль = newPassword;
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> EditProfilePhotoAsync(int userID, string newPhoto)
        {
            Пользователи userProfile = await _dbContext.Пользователиs.SingleOrDefaultAsync(user => user.КодПользователя == userID);
            if (userProfile is null || newPhoto.Length == 0)
                return false;

            userProfile.Фото = Convert.FromBase64String(newPhoto);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<Пользователи> GetByUserIDAsync(int userID) => await _dbContext.Пользователиs.AsNoTracking().SingleOrDefaultAsync(user => user.КодПользователя == userID);

        public async Task<Пользователи> GetByUsernameAsync(string username) => await _dbContext.Пользователиs.AsNoTracking().SingleOrDefaultAsync(commentUser => commentUser.Логин == username);
    }
}