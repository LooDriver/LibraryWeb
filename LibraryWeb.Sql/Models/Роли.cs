using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Models
{

    public partial class Роли
    {
        public int КодРоли { get; set; }

        public string? НазваниеРоли { get; set; }

        public virtual ICollection<Пользователи> Пользователиs { get; set; } = new List<Пользователи>();
    }
}