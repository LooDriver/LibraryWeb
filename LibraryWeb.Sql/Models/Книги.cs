namespace LibraryWeb.Sql.Models
{

    public partial class Книги
    {
        public int КодКниги { get; set; }

        public string? Название { get; set; }

        public int? КодАвтора { get; set; }

        public int? КодЖанра { get; set; }

        public byte[]? ОбложкаКниги { get; set; }

        public int? КоличествоВНаличии { get; set; }

        public virtual Автор? КодАвтораNavigation { get; set; }

        public virtual Жанр? КодЖанраNavigation { get; set; }

    }
}