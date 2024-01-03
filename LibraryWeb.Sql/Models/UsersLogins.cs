using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryWeb.Sql.Models
{
    public class UsersLogins
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public UsersLogins(string login, string password)
        {
            Login = login;
            Password = password;
        }
    }
}
