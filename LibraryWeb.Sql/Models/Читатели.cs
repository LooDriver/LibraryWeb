using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Model
{

    public partial class Читатели
    {
        public int КодЧитателя { get; set; }

        public string Фио { get; set; } = null!;

        public int НомерБилета { get; set; }

        public virtual ICollection<ВыдачаКниг> ВыдачаКнигs { get; set; } = new List<ВыдачаКниг>();
    }
}