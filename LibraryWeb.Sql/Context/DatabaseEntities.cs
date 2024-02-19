using LibraryWeb.Sql.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;

namespace LibraryWeb.Sql.Context
{

    public partial class DatabaseEntities : DbContext
    {
        private readonly string connectionString = "Server=localhost\\sqlexpress;Database=Библиотека;Trusted_Connection=true;TrustServerCertificate=true";
        public DatabaseEntities()
        {
            if (IsConnect(connectionString))
            {
                return;
            }
            else
            {
                Database.EnsureCreated();
            }
        }
        public DatabaseEntities(DbContextOptions<DatabaseEntities> options): base(options)
        {

        }

        private bool IsConnect(string connectionString)
        {
            try
            {
                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();
                connection.Dispose();
                return true;
            }
            catch (SqlException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public virtual DbSet<Автор> Авторs { get; set; }

        public virtual DbSet<Жанр> Жанрs { get; set; }

        public virtual DbSet<Избранное> Избранноеs { get; set; }

        public virtual DbSet<Книги> Книгиs { get; set; }


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

            modelBuilder.Entity<Жанр>(entity =>
            {
                entity.HasKey(e => e.КодЖанра);

                entity.ToTable("Жанр");

                entity.Property(e => e.КодЖанра).HasColumnName("Код_жанра");
                entity.Property(e => e.НазваниеЖанра)
                    .HasMaxLength(50)
                    .HasColumnName("Название_жанра");
            });

            modelBuilder.Entity<Избранное>(entity =>
            {
                entity.HasKey(e => e.КодИзбранного).HasName("PK_Избранное_1");

                entity.ToTable("Избранное");

                entity.Property(e => e.КодИзбранного).HasColumnName("Код_избранного");
                entity.Property(e => e.КодКниги).HasColumnName("Код_книги");

                entity.HasOne(d => d.КодКнигиNavigation).WithMany(p => p.Избранноеs)
                    .HasForeignKey(d => d.КодКниги)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Избранное_Книги");
            });

            modelBuilder.Entity<Книги>(entity =>
            {
                entity.HasKey(e => e.КодКниги);

                entity.ToTable("Книги");

                entity.HasIndex(e => e.КодАвтора, "IX_Книги_Код_автора");

                entity.HasIndex(e => e.КодЖанра, "IX_Книги_Код_жанра");

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

            modelBuilder.Entity<Корзина>(entity =>
            {
                entity.HasKey(e => e.КодИзбранного);

                entity.ToTable("Корзина");

                entity.Property(e => e.КодИзбранного)
                    .ValueGeneratedNever()
                    .HasColumnName("Код_избранного");
                entity.Property(e => e.КодКорзины)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("Код_корзины");

                entity.HasOne(d => d.КодИзбранногоNavigation).WithOne(p => p.Корзина)
                    .HasForeignKey<Корзина>(d => d.КодИзбранного)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Корзина_Избранное");
            });

            modelBuilder.Entity<Пользователи>(entity =>
            {
                entity.HasKey(e => e.КодПользователя);

                entity.ToTable("Пользователи");

                entity.HasIndex(e => e.КодРоли, "IX_Пользователи_Код_роли");

                entity.Property(e => e.КодПользователя).HasColumnName("Код_пользователя");
                entity.Property(e => e.КодРоли).HasColumnName("Код_роли");
                entity.Property(e => e.Логин).HasMaxLength(50);
                entity.Property(e => e.Пароль).HasMaxLength(100);

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
}