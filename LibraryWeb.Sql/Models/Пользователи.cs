using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Models;

public partial class Пользователи
{
    public int КодПользователя { get; set; }

    public string Фамилия { get; set; } = null!;

    public string Имя { get; set; } = null!;

    public string Логин { get; set; } = null!;

    public string Пароль { get; set; } = null!;

    public int КодРоли { get; set; }

    public virtual ICollection<Заказы> Заказыs { get; set; } = new List<Заказы>();

    public virtual ICollection<Избранное> Избранноеs { get; set; } = new List<Избранное>();

    public virtual Роли КодРолиNavigation { get; set; } = null!;

    public virtual ICollection<Корзина> Корзинаs { get; set; } = new List<Корзина>();
}
