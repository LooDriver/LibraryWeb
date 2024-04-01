namespace LibraryWeb.Integrations.Interfaces
{
    public interface IRepository<T>
    {
        List<T> GetAll(int userID = 0);
    }
}
