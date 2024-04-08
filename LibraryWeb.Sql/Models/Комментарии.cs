namespace LibraryWeb.Sql.Models;

public partial class Комментарии
{
    public int КодКомментария { get; set; }

    public int КодКниги { get; set; }

    public int КодПользователя { get; set; }

    public string ТекстКомментария { get; set; } = null!;

    public virtual Книги КодКнигиNavigation { get; set; } = null!;

    public virtual Пользователи КодПользователяNavigation { get; set; } = null!;
}
