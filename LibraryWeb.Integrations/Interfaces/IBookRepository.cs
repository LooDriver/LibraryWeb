namespace LibraryWeb.Integrations.Interfaces
{
    public interface IBookRepository<T>
    {
        List<T> GetAll();
        Task<T> GetByNameAsync(string name);
    }
}
