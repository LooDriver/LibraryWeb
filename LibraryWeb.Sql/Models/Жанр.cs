using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Model
{

    public partial class Жанр
    {
        public int КодЖанра { get; set; }

        public string? НазваниеЖанра { get; set; }

        public virtual ICollection<Книги> Книгиs { get; set; } = new List<Книги>();
    }
}