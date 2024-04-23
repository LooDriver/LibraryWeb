namespace LibraryWeb.Integrations.Interfaces
{
    public interface IFavoriteRepository<T>
    {
        List<T> GetAll(int userID);
        bool CheckExistFavorite(int userID, string bookName);
        bool Add(string bookName, int userID);
        bool Delete(string bookName);
    }
}
