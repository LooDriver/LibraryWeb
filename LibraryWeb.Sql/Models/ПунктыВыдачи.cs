namespace LibraryWeb.Sql.Models;

public partial class ПунктыВыдачи
{
    public int КодПунктаВыдачи { get; set; }

    public string? Название { get; set; }

    public string? Адрес { get; set; }

    public virtual ICollection<Заказы> Заказыs { get; set; } = new List<Заказы>();
}
