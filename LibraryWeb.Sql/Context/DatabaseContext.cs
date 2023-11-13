using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryWeb.Sql.Context
{
    public class DatabaseContext : DatabaseEntities
    {
        private static DatabaseContext _context;

        public static DatabaseContext GetContext()
        {
            if (_context == null) _context = new DatabaseContext();
            return _context;
        }
    }
}
