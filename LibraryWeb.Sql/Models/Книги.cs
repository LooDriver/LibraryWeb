using System;
using System.Collections.Generic;

namespace LibraryWeb.Sql.Model
{

    public partial class Книги
    {
        public int КодКниги { get; set; }

        public string? Название { get; set; }

        public int? КодАвтора { get; set; }

        public int? КодЖанра { get; set; }

        public byte[]? ОбложкаКниги { get; set; }

        public int? КоличествоВНаличии { get; set; }

        public string? Описание { get; set; }

        public virtual ICollection<ВыдачаКниг> ВыдачаКнигs { get; set; } = new List<ВыдачаКниг>();

        public virtual Автор? КодАвтораNavigation { get; set; }

        public virtual Жанр? КодЖанраNavigation { get; set; }


        public Книги(int кодКниги, string? название, int? кодАвтора, int? кодЖанра, int? количествоВНаличии)
        {
            КодКниги = кодКниги;
            Название = название;
            КодАвтора = кодАвтора;
            КодЖанра = кодЖанра;
            КоличествоВНаличии = количествоВНаличии;
        }

        public virtual ICollection<КорзинаКниг> КорзинаКнигs { get; set; } = new List<КорзинаКниг>();
    }
}