using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Models
{

    public partial class Пользователи
    {
        public int КодПользователя { get; set; }

        public int? КодРоли { get; set; }

        public string? Логин { get; set; }

        public string? Пароль { get; set; }

        public virtual Роли? КодРолиNavigation { get; set; }
    }
}