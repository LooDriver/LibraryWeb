namespace LibraryWeb.Integrations.Interfaces
{
    public interface IOrderRepository<T>
    {
        List<T> GetAll(int userID);
        bool Add(string[] bookName, int userID, int pickupPointId);
    }
}
