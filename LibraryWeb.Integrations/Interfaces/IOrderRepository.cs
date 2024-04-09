namespace LibraryWeb.Integrations.Interfaces
{
    public interface IOrderRepository<T> : IRepository<T>
    {
        bool Add(string[] bookName, int userID, int pickupPointId);
    }
}
