using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using LibraryWeb.Sql.Model;

namespace LibraryWeb.Sql.Context
{

    public partial class DatabaseEntities : DbContext
    {
        public DatabaseEntities()
        {
        }


        public virtual DbSet<Автор> Авторs { get; set; }

        public virtual DbSet<ВыдачаКниг> ВыдачаКнигs { get; set; }

        public virtual DbSet<Жанр> Жанрs { get; set; }

        public virtual DbSet<Книги> Книгиs { get; set; }

        public virtual DbSet<КорзинаКниг> КорзинаКнигs { get; set; }

        public virtual DbSet<Читатели> Читателиs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
            => optionsBuilder.UseSqlServer("Server=localhost\\sqlexpress;Database=Библиотека;Trusted_Connection=true;TrustServerCertificate=true");

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

                entity.HasIndex(e => e.КодКниги, "IX_Выдача_книг_Код_книги");

                entity.HasIndex(e => e.КодЧитателя, "IX_Выдача_книг_Код_читателя");

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

            modelBuilder.Entity<КорзинаКниг>(entity =>
            {
                entity.ToTable("Корзина_книг");

                entity.HasIndex(e => e.КодКниги, "IX_Корзина_книг_Код_книги");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("ID");
                entity.Property(e => e.КодКниги).HasColumnName("Код_книги");

                entity.HasOne(d => d.КодКнигиNavigation).WithMany(p => p.КорзинаКнигs)
                    .HasForeignKey(d => d.КодКниги)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Корзина_книг_Книги");
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