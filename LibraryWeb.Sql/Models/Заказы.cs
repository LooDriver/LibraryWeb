namespace LibraryWeb.Sql.Models;

public partial class Заказы
{
    public int КодЗаказа { get; set; }

    public int? КодПунктаВыдачи { get; set; }

    public int КодПользователя { get; set; }

    public int КодКниги { get; set; }

    public DateOnly ДатаЗаказа { get; set; }

    public string Статус { get; set; } = null!;

    public virtual Книги КодКнигиNavigation { get; set; } = null!;

    public virtual Пользователи КодПользователяNavigation { get; set; } = null!;

    public virtual ПунктыВыдачи? КодПунктаВыдачиNavigation { get; set; }
}
