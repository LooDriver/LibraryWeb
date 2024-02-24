using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Models;

public partial class Избранное
{
    public int КодИзбранного { get; set; }

    public int КодКниги { get; set; }

    public int КодПокупателя { get; set; }

    public int? Количество { get; set; }

    public virtual Книги КодКнигиNavigation { get; set; } = null!;

    public virtual Покупатели КодПокупателяNavigation { get; set; } = null!;
}
