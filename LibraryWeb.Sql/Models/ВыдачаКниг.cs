using System;
using System.Collections.Generic;

namespace LibraryWeb.Core.Models;

public partial class ВыдачаКниг
{
    public int КодВыданнойКниги { get; set; }

    public int? КодЧитателя { get; set; }

    public int? КодКниги { get; set; }

    public DateTime? ДатаВыдачи { get; set; }

    public DateTime? ДатаВозврата { get; set; }

    public int? КоличествоВРеестре { get; set; }

    public virtual Книги? КодКнигиNavigation { get; set; }

    public virtual Читатели? КодЧитателяNavigation { get; set; }
}
