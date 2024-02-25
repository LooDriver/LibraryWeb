using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Models;

public partial class Книги
{
    public int КодКниги { get; set; }

    public int КодИздательства { get; set; }

    public string Жанр { get; set; } = null!;

    public string Автор { get; set; } = null!;

    public string Название { get; set; } = null!;

    public byte[]? Обложка { get; set; }

    public string? Описание { get; set; }

    public int Наличие { get; set; }

    public virtual ICollection<Избранное> Избранноеs { get; set; } = new List<Избранное>();

    public virtual Издательство КодИздательстваNavigation { get; set; } = null!;

    public virtual ICollection<Корзина> Корзинаs { get; set; } = new List<Корзина>();
}
