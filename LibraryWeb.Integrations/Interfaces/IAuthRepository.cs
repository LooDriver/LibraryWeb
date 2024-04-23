using LibraryWeb.Sql.Models;

namespace LibraryWeb.Integrations.Interfaces
{
    public interface IAuthRepository<T>
    {
        Task<Пользователи> CheckLogin(string username, string password);
        Task<bool> RegisterUsers(string surname, string name, string username, string password, int role = 2);
    }
}
