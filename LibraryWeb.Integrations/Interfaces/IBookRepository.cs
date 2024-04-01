namespace LibraryWeb.Integrations.Interfaces
{
    public interface IBookRepository<T> : IRepository<T>
    {
        Task<T> GetByNameAsync(string name);
    }
}
