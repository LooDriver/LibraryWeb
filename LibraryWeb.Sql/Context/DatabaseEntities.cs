using LibraryWeb.Sql.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Sql.Context
{
    public partial class DatabaseEntities : DbContext
    {
        public DatabaseEntities(DbContextOptions<DatabaseEntities> options) : base(options)
        {
            if (Database.CanConnect())
            {
                return;
            }
            else
            {
                Database.EnsureCreated();
            }
        }

        public virtual DbSet<Заказы> Заказыs { get; set; }

        public virtual DbSet<Избранное> Избранноеs { get; set; }

        public virtual DbSet<Издательство> Издательствоs { get; set; }

        public virtual DbSet<Книги> Книгиs { get; set; }

        public virtual DbSet<Комментарии> Комментарииs { get; set; }

        public virtual DbSet<Корзина> Корзинаs { get; set; }

        public virtual DbSet<Пользователи> Пользователиs { get; set; }

        public virtual DbSet<ПунктыВыдачи> ПунктыВыдачиs { get; set; }

        public virtual DbSet<Роли> Ролиs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Заказы>(entity =>
            {
                entity.HasKey(e => e.КодЗаказа);

                entity.ToTable("Заказы");

                entity.HasIndex(e => e.КодКниги, "IX_Заказы_Код_книги");

                entity.HasIndex(e => e.КодПользователя, "IX_Заказы_Код_пользователя");

                entity.HasIndex(e => e.КодПунктаВыдачи, "IX_Заказы_Код_пункта_выдачи");

                entity.Property(e => e.КодЗаказа).HasColumnName("Код_заказа");
                entity.Property(e => e.ДатаЗаказа).HasColumnName("Дата_заказа");
                entity.Property(e => e.КодКниги).HasColumnName("Код_книги");
                entity.Property(e => e.КодПользователя).HasColumnName("Код_пользователя");
                entity.Property(e => e.КодПунктаВыдачи).HasColumnName("Код_пункта_выдачи");
                entity.Property(e => e.Статус).HasMaxLength(50);

                entity.HasOne(d => d.КодКнигиNavigation).WithMany(p => p.Заказыs)
                    .HasForeignKey(d => d.КодКниги)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Заказы_Книги");

                entity.HasOne(d => d.КодПользователяNavigation).WithMany(p => p.Заказыs)
                    .HasForeignKey(d => d.КодПользователя)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Заказы_Пользователи");

                entity.HasOne(d => d.КодПунктаВыдачиNavigation).WithMany(p => p.Заказыs)
                    .HasForeignKey(d => d.КодПунктаВыдачи)
                    .HasConstraintName("FK_Заказы_Пункты_выдачи");
            });

            modelBuilder.Entity<Избранное>(entity =>
            {
                entity.HasKey(e => e.КодИзбранного);

                entity.ToTable("Избранное");

                entity.HasIndex(e => e.КодКниги, "IX_Избранное_Код_книги");

                entity.HasIndex(e => e.КодПользователя, "IX_Избранное_Код_пользователя");

                entity.Property(e => e.КодИзбранного).HasColumnName("Код_избранного");
                entity.Property(e => e.КодКниги).HasColumnName("Код_книги");
                entity.Property(e => e.КодПользователя).HasColumnName("Код_пользователя");

                entity.HasOne(d => d.КодКнигиNavigation).WithMany(p => p.Избранноеs)
                    .HasForeignKey(d => d.КодКниги)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Избранное_Книги");

                entity.HasOne(d => d.КодПользователяNavigation).WithMany(p => p.Избранноеs)
                    .HasForeignKey(d => d.КодПользователя)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Избранное_Пользователи");
            });

            modelBuilder.Entity<Издательство>(entity =>
            {
                entity.HasKey(e => e.КодИздательства);

                entity.ToTable("Издательство");

                entity.Property(e => e.КодИздательства).HasColumnName("Код_издательства");
                entity.Property(e => e.Адрес).HasMaxLength(50);
                entity.Property(e => e.Директор).HasMaxLength(50);
                entity.Property(e => e.Название).HasMaxLength(50);
            });

            modelBuilder.Entity<Книги>(entity =>
            {
                entity.HasKey(e => e.КодКниги);

                entity.ToTable("Книги");

                entity.HasIndex(e => e.КодИздательства, "IX_Книги_Код_издательства");

                entity.Property(e => e.КодКниги).HasColumnName("Код_книги");
                entity.Property(e => e.Автор).HasMaxLength(50);
                entity.Property(e => e.Жанр).HasMaxLength(50);
                entity.Property(e => e.КодИздательства).HasColumnName("Код_издательства");
                entity.Property(e => e.Название).HasMaxLength(50);
                entity.Property(e => e.Описание).HasMaxLength(150);
                entity.Property(e => e.Цена).HasColumnType("money");

                entity.HasOne(d => d.КодИздательстваNavigation).WithMany(p => p.Книгиs)
                    .HasForeignKey(d => d.КодИздательства)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Книги_Издательство");
            });

            modelBuilder.Entity<Комментарии>(entity =>
            {
                entity.HasKey(e => e.КодКомментария).HasName("PK_Комментарий");

                entity.ToTable("Комментарии");

                entity.Property(e => e.КодКомментария).HasColumnName("Код_комментария");
                entity.Property(e => e.КодКниги).HasColumnName("Код_книги");
                entity.Property(e => e.КодПользователя).HasColumnName("Код_пользователя");
                entity.Property(e => e.ТекстКомментария)
                    .HasMaxLength(150)
                    .HasColumnName("Текст_комментария");

                entity.HasOne(d => d.КодКнигиNavigation).WithMany(p => p.Комментарииs)
                    .HasForeignKey(d => d.КодКниги)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Комментарии_Книги");

                entity.HasOne(d => d.КодПользователяNavigation).WithMany(p => p.Комментарииs)
                    .HasForeignKey(d => d.КодПользователя)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Комментарий_Пользователи");
            });

            modelBuilder.Entity<Корзина>(entity =>
            {
                entity.HasKey(e => e.КодКорзины);

                entity.ToTable("Корзина");

                entity.HasIndex(e => e.КодКниги, "IX_Корзина_Код_книги");

                entity.HasIndex(e => e.КодПользователя, "IX_Корзина_Код_пользователя");

                entity.Property(e => e.КодКорзины).HasColumnName("Код_корзины");
                entity.Property(e => e.КодКниги).HasColumnName("Код_книги");
                entity.Property(e => e.КодПользователя).HasColumnName("Код_пользователя");

                entity.HasOne(d => d.КодКнигиNavigation).WithMany(p => p.Корзинаs)
                    .HasForeignKey(d => d.КодКниги)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Корзина_Книги");

                entity.HasOne(d => d.КодПользователяNavigation).WithMany(p => p.Корзинаs)
                    .HasForeignKey(d => d.КодПользователя)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Корзина_Пользователи");
            });

            modelBuilder.Entity<Пользователи>(entity =>
            {
                entity.HasKey(e => e.КодПользователя);

                entity.ToTable("Пользователи");

                entity.HasIndex(e => e.КодРоли, "IX_Пользователи_Код_роли");

                entity.Property(e => e.КодПользователя).HasColumnName("Код_пользователя");
                entity.Property(e => e.Имя).HasMaxLength(50);
                entity.Property(e => e.КодРоли).HasColumnName("Код_роли");
                entity.Property(e => e.Логин).HasMaxLength(50);
                entity.Property(e => e.Пароль).HasMaxLength(50);
                entity.Property(e => e.Фамилия).HasMaxLength(50);

                entity.HasOne(d => d.КодРолиNavigation).WithMany(p => p.Пользователиs)
                    .HasForeignKey(d => d.КодРоли)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Пользователи_Роли");
            });

            modelBuilder.Entity<ПунктыВыдачи>(entity =>
            {
                entity.HasKey(e => e.КодПунктаВыдачи);

                entity.ToTable("Пункты_выдачи");

                entity.Property(e => e.КодПунктаВыдачи).HasColumnName("Код_пункта_выдачи");
                entity.Property(e => e.Адрес).HasMaxLength(150);
                entity.Property(e => e.Название).HasMaxLength(50);
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