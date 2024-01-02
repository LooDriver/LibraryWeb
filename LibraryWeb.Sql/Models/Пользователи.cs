using System;
using System.Collections.Generic;

namespace LibraryWeb.Core.Models;

public partial class Пользователи
{
    public int КодПользователя { get; set; }

    public int? КодРоли { get; set; }

    public int? КодЧитательскогоБилета { get; set; }

    public virtual Роли? КодРолиNavigation { get; set; }
}
