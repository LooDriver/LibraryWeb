namespace LibraryWeb.Sql.Models
{

    public partial class Автор
    {
        public int КодАвтора { get; set; }

        public string? Фио { get; set; }

        public virtual ICollection<Книги> Книгиs { get; set; } = new List<Книги>();
    }
}