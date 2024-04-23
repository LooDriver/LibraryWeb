namespace LibraryWeb.Integrations.Interfaces
{
    public interface ICommentsRepository<T>
    {
        List<T> GetAll(string bookName);
        Task<bool> AddNewCommentAsync(string comment, int userID, string bookName);
    }
}
