using LibraryWeb.Sql.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Sql.Context
{

    public partial class DatabaseEntities : DbContext
    {
        private readonly string connectionString = "Server=localhost\\sqlexpress;Database=Книжный_магазин;Trusted_Connection=true;TrustServerCertificate=true";
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
        public DatabaseEntities(DbContextOptions<DatabaseEntities> options) : base(options)
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

        public virtual DbSet<Избранное> Избранноеs { get; set; }

        public virtual DbSet<Издательство> Издательствоs { get; set; }

        public virtual DbSet<Книги> Книгиs { get; set; }

        public virtual DbSet<Корзина> Корзинаs { get; set; }

        public virtual DbSet<Покупатели> Покупателиs { get; set; }

        public virtual DbSet<Пользователи> Пользователиs { get; set; }

        public virtual DbSet<Роли> Ролиs { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer(connectionString);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Избранное>(entity =>
            {
                entity.HasKey(e => e.КодИзбранного);

                entity.ToTable("Избранное");

                entity.Property(e => e.КодИзбранного)
                    .ValueGeneratedNever()
                    .HasColumnName("Код_избранного");
                entity.Property(e => e.КодКниги).HasColumnName("Код_книги");
                entity.Property(e => e.КодПокупателя).HasColumnName("Код_покупателя");

                entity.HasOne(d => d.КодКнигиNavigation).WithMany(p => p.Избранноеs)
                    .HasForeignKey(d => d.КодКниги)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Избранное_Книги");

                entity.HasOne(d => d.КодПокупателяNavigation).WithMany(p => p.Избранноеs)
                    .HasForeignKey(d => d.КодПокупателя)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Избранное_Покупатели");
            });

            modelBuilder.Entity<Издательство>(entity =>
            {
                entity.HasKey(e => e.КодИздательства);

                entity.ToTable("Издательство");

                entity.Property(e => e.КодИздательства)
                    .ValueGeneratedNever()
                    .HasColumnName("Код_издательства");
                entity.Property(e => e.Адрес).HasMaxLength(50);
                entity.Property(e => e.Директор).HasMaxLength(50);
                entity.Property(e => e.Название).HasMaxLength(50);
            });

            modelBuilder.Entity<Книги>(entity =>
            {
                entity.HasKey(e => e.КодКниги);

                entity.ToTable("Книги");

                entity.Property(e => e.КодКниги)
                    .ValueGeneratedNever()
                    .HasColumnName("Код_книги");
                entity.Property(e => e.Автор).HasMaxLength(50);
                entity.Property(e => e.Жанр).HasMaxLength(50);
                entity.Property(e => e.КодИздательства).HasColumnName("Код_издательства");
                entity.Property(e => e.Название).HasMaxLength(50);
                entity.Property(e => e.Описание).HasMaxLength(150);

                entity.HasOne(d => d.КодИздательстваNavigation).WithMany(p => p.Книгиs)
                    .HasForeignKey(d => d.КодИздательства)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Книги_Издательство");
            });

            modelBuilder.Entity<Корзина>(entity =>
            {
                entity.HasKey(e => e.КодКорзины);

                entity.ToTable("Корзина");

                entity.Property(e => e.КодКорзины)
                    .ValueGeneratedNever()
                    .HasColumnName("Код_корзины");
                entity.Property(e => e.КодКниги).HasColumnName("Код_книги");
                entity.Property(e => e.КодПокупателя).HasColumnName("Код_покупателя");
                entity.Property(e => e.Цена).HasColumnType("money");

                entity.HasOne(d => d.КодКнигиNavigation).WithMany(p => p.Корзинаs)
                    .HasForeignKey(d => d.КодКниги)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Корзина_Книги");

                entity.HasOne(d => d.КодПокупателяNavigation).WithMany(p => p.Корзинаs)
                    .HasForeignKey(d => d.КодПокупателя)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Корзина_Покупатели");
            });

            modelBuilder.Entity<Покупатели>(entity =>
            {
                entity.HasKey(e => e.КодПокупателя);

                entity.ToTable("Покупатели");

                entity.Property(e => e.КодПокупателя)
                    .ValueGeneratedNever()
                    .HasColumnName("Код_покупателя");
                entity.Property(e => e.КодПользователя).HasColumnName("Код_пользователя");
                entity.Property(e => e.Фио)
                    .HasMaxLength(50)
                    .HasColumnName("ФИО");

                entity.HasOne(d => d.КодПользователяNavigation).WithMany(p => p.Покупателиs)
                    .HasForeignKey(d => d.КодПользователя)
                    .HasConstraintName("FK_Покупатели_Пользователи");
            });

            modelBuilder.Entity<Пользователи>(entity =>
            {
                entity.HasKey(e => e.КодПользователя);

                entity.ToTable("Пользователи");

                entity.Property(e => e.КодПользователя)
                    .ValueGeneratedNever()
                    .HasColumnName("Код_пользователя");
                entity.Property(e => e.КодРоли).HasColumnName("Код_роли");
                entity.Property(e => e.Логин).HasMaxLength(50);
                entity.Property(e => e.Пароль).HasMaxLength(50);

                entity.HasOne(d => d.КодРолиNavigation).WithMany(p => p.Пользователиs)
                    .HasForeignKey(d => d.КодРоли)
                    .HasConstraintName("FK_Пользователи_Роли");
            });

            modelBuilder.Entity<Роли>(entity =>
            {
                entity.HasKey(e => e.КодРоли);

                entity.ToTable("Роли");

                entity.Property(e => e.КодРоли).HasColumnName("Код_роли");
                entity.Property(e => e.Название).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}