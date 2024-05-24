namespace LibraryWeb.Integrations.Interfaces
{
    public interface IFavoriteRepository<T>
    {
        List<T> GetAll(int userID);
        bool CheckExistFavorite(int userID, string bookName);
        Task<bool> Add(string bookName, int userID);
        Task<bool> Delete(string bookName);
    }
}
