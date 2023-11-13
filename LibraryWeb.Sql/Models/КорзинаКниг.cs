using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Model
{

    public partial class КорзинаКниг
    {
        public int Id { get; set; }

        public int? КодКниги { get; set; }

        public virtual Книги? КодКнигиNavigation { get; set; }
    }
}