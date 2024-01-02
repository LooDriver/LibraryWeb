using LibraryWeb.Core.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace LibrayWeb.Sql.Context;

public partial class DatabaseEntities : DbContext
{
    private static bool Connected = false;
    private readonly string connectionString = "Server=localhost\\sqlexpress;Database=Библиотека;Trusted_Connection=true;TrustServerCertificate=true";
    public DatabaseEntities()
    {
        IsConnect(connectionString);
        if (Connected)
        {
            return;
        }
        else
        {
            Database.EnsureCreated();
        }
    }

    private void IsConnect(string connectionString)
    {
        try
        {
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            connection.Dispose();
            Connected = true;
        }
        catch (SqlException ex)
        {
            Console.WriteLine(ex.Message);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }

    public virtual DbSet<Автор> Авторs { get; set; }

    public virtual DbSet<ВыдачаКниг> ВыдачаКнигs { get; set; }

    public virtual DbSet<Жанр> Жанрs { get; set; }

    public virtual DbSet<Книги> Книгиs { get; set; }

    public virtual DbSet<КорзинаКниг> КорзинаКнигs { get; set; }

    public virtual DbSet<Пользователи> Пользователиs { get; set; }

    public virtual DbSet<Роли> Ролиs { get; set; }

    public virtual DbSet<Читатели> Читателиs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer(connectionString);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Автор>(entity =>
        {
            entity.HasKey(e => e.КодАвтора);

            entity.ToTable("Автор");

            entity.Property(e => e.КодАвтора).HasColumnName("Код_автора");
            entity.Property(e => e.Фио)
                .HasMaxLength(50)
                .HasColumnName("ФИО");
        });

        modelBuilder.Entity<ВыдачаКниг>(entity =>
        {
            entity.HasKey(e => e.КодВыданнойКниги);

            entity.ToTable("Выдача_книг");

            entity.Property(e => e.КодВыданнойКниги).HasColumnName("Код_выданной_книги");
            entity.Property(e => e.ДатаВозврата)
                .HasColumnType("date")
                .HasColumnName("Дата_возврата");
            entity.Property(e => e.ДатаВыдачи)
                .HasColumnType("date")
                .HasColumnName("Дата_выдачи");
            entity.Property(e => e.КодКниги).HasColumnName("Код_книги");
            entity.Property(e => e.КодЧитателя).HasColumnName("Код_читателя");
            entity.Property(e => e.КоличествоВРеестре).HasColumnName("Количество_в_реестре");

            entity.HasOne(d => d.КодКнигиNavigation).WithMany(p => p.ВыдачаКнигs)
                .HasForeignKey(d => d.КодКниги)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Выдача_книг_Книги");

            entity.HasOne(d => d.КодЧитателяNavigation).WithMany(p => p.ВыдачаКнигs)
                .HasForeignKey(d => d.КодЧитателя)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Выдача_книг_Читатели");
        });

        modelBuilder.Entity<Жанр>(entity =>
        {
            entity.HasKey(e => e.КодЖанра);

            entity.ToTable("Жанр");

            entity.Property(e => e.КодЖанра).HasColumnName("Код_жанра");
            entity.Property(e => e.НазваниеЖанра)
                .HasMaxLength(50)
                .HasColumnName("Название_жанра");
        });

        modelBuilder.Entity<Книги>(entity =>
        {
            entity.HasKey(e => e.КодКниги);

            entity.ToTable("Книги");

            entity.Property(e => e.КодКниги).HasColumnName("Код_книги");
            entity.Property(e => e.КодАвтора).HasColumnName("Код_автора");
            entity.Property(e => e.КодЖанра).HasColumnName("Код_жанра");
            entity.Property(e => e.КоличествоВНаличии).HasColumnName("Количество_в_наличии");
            entity.Property(e => e.Название).HasMaxLength(150);
            entity.Property(e => e.ОбложкаКниги).HasColumnName("Обложка_книги");

            entity.HasOne(d => d.КодАвтораNavigation).WithMany(p => p.Книгиs)
                .HasForeignKey(d => d.КодАвтора)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Книги_Автор");

            entity.HasOne(d => d.КодЖанраNavigation).WithMany(p => p.Книгиs)
                .HasForeignKey(d => d.КодЖанра)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Книги_Жанр");
        });

        modelBuilder.Entity<КорзинаКниг>(entity =>
        {
            entity.ToTable("Корзина_книг");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("ID");
            entity.Property(e => e.КодКниги).HasColumnName("Код_книги");

            entity.HasOne(d => d.КодКнигиNavigation).WithMany(p => p.КорзинаКнигs)
                .HasForeignKey(d => d.КодКниги)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Корзина_книг_Книги");
        });

        modelBuilder.Entity<Пользователи>(entity =>
        {
            entity.HasKey(e => e.КодПользователя);

            entity.ToTable("Пользователи");

            entity.Property(e => e.КодПользователя).HasColumnName("Код_пользователя");
            entity.Property(e => e.КодРоли).HasColumnName("Код_роли");
            entity.Property(e => e.КодЧитательскогоБилета).HasColumnName("Код_читательского_билета");

            entity.HasOne(d => d.КодРолиNavigation).WithMany(p => p.Пользователиs)
                .HasForeignKey(d => d.КодРоли)
                .HasConstraintName("FK_Пользователи_Роли");
        });

        modelBuilder.Entity<Роли>(entity =>
        {
            entity.HasKey(e => e.КодРоли);

            entity.ToTable("Роли");

            entity.Property(e => e.КодРоли).HasColumnName("Код_роли");
            entity.Property(e => e.НазваниеРоли)
                .HasMaxLength(50)
                .HasColumnName("Название_роли");
        });

        modelBuilder.Entity<Читатели>(entity =>
        {
            entity.HasKey(e => e.КодЧитателя);

            entity.ToTable("Читатели");

            entity.Property(e => e.КодЧитателя).HasColumnName("Код_читателя");
            entity.Property(e => e.НомерБилета).HasColumnName("Номер_билета");
            entity.Property(e => e.Фио)
                .HasMaxLength(150)
                .HasColumnName("ФИО");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
