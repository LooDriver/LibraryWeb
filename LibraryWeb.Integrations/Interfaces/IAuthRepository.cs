using LibraryWeb.Sql.Models;

namespace LibraryWeb.Integrations.Interfaces
{
    public interface IAuthRepository<T>
    {
        Task<Пользователи> CheckLoginAsync(string username, string password);
        Task<bool> RegisterUsersAsync(string surname, string name, string username, string password, int role = 2);
        Task<bool> ValidationRecoveryAccount(string username);
        Task<bool> RecoveryAccountAsync(string username, string newPassword);
    }
}
