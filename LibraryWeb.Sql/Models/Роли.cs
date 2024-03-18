namespace LibraryWeb.Sql.Models;

public partial class Роли
{
    public int КодРоли { get; set; }

    public string? Название { get; set; }

    public virtual ICollection<Пользователи> Пользователиs { get; set; } = new List<Пользователи>();
}
