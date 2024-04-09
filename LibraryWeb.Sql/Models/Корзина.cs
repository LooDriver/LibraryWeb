namespace LibraryWeb.Sql.Models;

public partial class Корзина
{
    public int КодКорзины { get; set; }

    public int КодПользователя { get; set; }

    public int КодКниги { get; set; }

    public int Количество { get; set; }

    public virtual Книги КодКнигиNavigation { get; set; } = null!;

    public virtual Пользователи КодПользователяNavigation { get; set; } = null!;
}
