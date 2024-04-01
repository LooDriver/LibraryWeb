namespace LibraryWeb.Integrations.Interfaces
{
    public interface ICartRepository<T> : IRepository<T>
    {
        Task<bool> AddAsync(string bookName, int userID, int quantity);
        bool Delete(string orderDeleteName);
        bool ClearCart(int userID);
    }
}
