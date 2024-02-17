using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Models
{

    public partial class Избранное
    {
        public int КодИзбранного { get; set; }

        public int КодКниги { get; set; }

        public virtual Книги КодКнигиNavigation { get; set; } = null!;

        public virtual Корзина? Корзина { get; set; }
    }
}