using LibraryWeb.Sql.Models;

namespace LibraryWeb.Integrations.Interfaces
{
    public interface IAuthRepository<T> : IRepository<T>
    {
        Task<Пользователи> CheckLogin(Пользователи logins);
        Task<bool> RegisterUsers(Пользователи registers);
    }
}
