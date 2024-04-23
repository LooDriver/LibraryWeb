namespace LibraryWeb.Integrations.Interfaces
{
    public interface IPickupPointRepository<T>
    {
        List<T> GetAll();
    }
}
