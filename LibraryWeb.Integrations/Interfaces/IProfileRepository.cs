using LibraryWeb.Sql.Models;

namespace LibraryWeb.Integrations.Interfaces
{
    public interface IProfileRepository<T> : IRepository<T>
    {
        Task<Пользователи> GetById(int userID);

        Task<bool> EditProfileAsync(int userID, Пользователи пользователи);

        Task<bool> EditProfilePhotoAsync(int userID, string newPhoto);

        Task<bool> EditProfilePasswordAsync(int userID, string newPassword);
    }
}
