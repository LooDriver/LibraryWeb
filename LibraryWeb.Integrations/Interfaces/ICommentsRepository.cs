namespace LibraryWeb.Integrations.Interfaces
{
    public interface ICommentsRepository<T> : IRepository<T>
    {
        List<T> GetAll(string bookName);
        Task<bool> AddNewCommentAsync(string comment, int userID, string bookName);
    }
}
