using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Models;

public partial class Издательство
{
    public int КодИздательства { get; set; }

    public string? Название { get; set; }

    public string? Адрес { get; set; }

    public string? Директор { get; set; }

    public virtual ICollection<Книги> Книгиs { get; set; } = new List<Книги>();
}
