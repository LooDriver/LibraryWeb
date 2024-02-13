using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Models
{

    public partial class Корзина
    {
        public int КодКорзины { get; set; }

        public int КодИзбранного { get; set; }

        public virtual Избранное КодИзбранногоNavigation { get; set; } = null!;
    }
}