namespace LibraryWeb.Integrations.Interfaces
{
    public interface ICartRepository<T> : IRepository<T>
    {
        bool CheckExistsCartItem(int userID, string bookName);
        Task<bool> AddAsync(string bookName, int userID, int quantity);
        bool Delete(string orderDeleteName);
        bool ClearCart(int userID);
    }
}
