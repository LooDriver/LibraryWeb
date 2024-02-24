using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Models;

public partial class Покупатели
{
    public int КодПокупателя { get; set; }

    public int? КодПользователя { get; set; }

    public string? Фио { get; set; }

    public virtual ICollection<Избранное> Избранноеs { get; set; } = new List<Избранное>();

    public virtual Пользователи? КодПользователяNavigation { get; set; }

    public virtual ICollection<Корзина> Корзинаs { get; set; } = new List<Корзина>();
}
