using LibraryWeb.Sql.Models;

namespace LibraryWeb.Integrations.Interfaces
{
    public interface IProfileRepository<T>
    {
        Task<Пользователи> GetByUserIDAsync(int userID);

        Task<Пользователи> GetByUsernameAsync(string username);

        Task<bool> EditProfileAsync(int userID, string name, string surname, string username);

        Task<bool> EditProfilePhotoAsync(int userID, string newPhoto);

        Task<bool> EditProfilePasswordAsync(int userID, string newPassword);
    }
}
