using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;

namespace LibraryWeb.IntegrationsTests.SetupEnviroment
{
    public static class TestDataSeeder
    {
        /// <summary>
        /// Заполняет таблицу "Заказы" для тестовой базы данных
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public static void SeedOrders(DatabaseEntities context)
        {
            if (!context.Заказыs.Any())
            {
                var orders = new[]
                {
                    new Заказы { ДатаЗаказа = DateOnly.FromDateTime(DateTime.Now), КодКниги = 1, КодПользователя = 1, КодПунктаВыдачи = 1, Статус = "В обработке" },
                    new Заказы { ДатаЗаказа = DateOnly.FromDateTime(DateTime.Now), КодКниги = 2, КодПользователя = 2, КодПунктаВыдачи = 2, Статус = "В доставке" }
                };

                context.Заказыs.AddRange(orders);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Заполняет таблицу "Избранное" для тестовой базы данных
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public static void SeedFavorites(DatabaseEntities context)
        {
            if (!context.Избранноеs.Any())
            {
                var favorites = new[]
                {
                    new Избранное { КодКниги = 1, КодПользователя = 1 },
                    new Избранное { КодКниги = 2, КодПользователя = 2 }
                };

                context.Избранноеs.AddRange(favorites);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Заполняет таблицу "Издатели" для тестовой базы данных
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public static void SeedPublishers(DatabaseEntities context)
        {
            if (!context.Издательствоs.Any())
            {
                var publishers = new[]
                {
                    new Издательство { Название = "Издательство 1", Адрес = "Адрес 1", Директор = "Директор 1" },
                    new Издательство { Название = "Издательство 2", Адрес = "Адрес 2", Директор = "Директор 2" }
                };

                context.Издательствоs.AddRange(publishers);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Заполняет таблицу "Книги" для тестовой базы данных
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public static void SeedBooks(DatabaseEntities context)
        {
            if (!context.Книгиs.Any())
            {
                var books = new[]
                {
                    new Книги { Название = "Книга 1", Автор = "Автор 1", Жанр = "Жанр 1", КодИздательства = 1, Цена = 10.99m, Наличие = 15 },
                    new Книги { Название = "Книга 2", Автор = "Автор 2", Жанр = "Жанр 2", КодИздательства = 2, Цена = 20.49m, Наличие = 20 }
                };

                context.Книгиs.AddRange(books);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Заполняет таблицу "Комментарии" для тестовой базы данных
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public static void SeedComments(DatabaseEntities context)
        {
            if (!context.Комментарииs.Any())
            {
                var comments = new[]
                {
                    new Комментарии { КодКниги = 1, КодПользователя = 1, ТекстКомментария = "Отличная книга!" },
                    new Комментарии { КодКниги = 2, КодПользователя = 2, ТекстКомментария = "Рекомендую!" }
                };

                context.Комментарииs.AddRange(comments);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Заполняет таблицу "Корзина" для тестовой базы данных
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public static void SeedCarts(DatabaseEntities context)
        {
            if (!context.Корзинаs.Any())
            {
                var carts = new[]
                {
                    new Корзина { КодКниги = 1, КодПользователя = 1 },
                    new Корзина { КодКниги = 1, КодПользователя = 3 },
                    new Корзина { КодКниги = 1, КодПользователя = 1 },
                    new Корзина { КодКниги = 2, КодПользователя = 3 },
                    new Корзина { КодКниги = 2, КодПользователя = 2 },
                    new Корзина { КодКниги = 2, КодПользователя = 2 }
                };

                context.Корзинаs.AddRange(carts);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Заполняет таблицу "Пользователи" для тестовой базы данных
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public static void SeedUsers(DatabaseEntities context)
        {
            if (!context.Пользователиs.Any())
            {
                var users = new[]
                {
                    new Пользователи { Имя = "Пользователь 1", Фамилия = "Фамилия 1", Логин = "user1", Пароль = "password1", КодРоли = 1 },
                    new Пользователи { Имя = "Пользователь 2", Фамилия = "Фамилия 2", Логин = "user2", Пароль = "password2", КодРоли = 2 },
                    new Пользователи { Имя = "Пользователь 3", Фамилия = "Фамилия 3", Логин = "user3", Пароль = "password2", КодРоли = 2 }
                };

                context.Пользователиs.AddRange(users);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Заполняет таблицу "Пункты выдачи" для тестовой базы данных
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public static void SeedPickupPoints(DatabaseEntities context)
        {
            if (!context.ПунктыВыдачиs.Any())
            {
                var pickupPoints = new[]
                {
                    new ПунктыВыдачи { Название = "Пункт выдачи 1", Адрес = "Адрес 1" },
                    new ПунктыВыдачи { Название = "Пункт выдачи 2", Адрес = "Адрес 2" }
                };

                context.ПунктыВыдачиs.AddRange(pickupPoints);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Заполняет таблицу "Роли" для тестовой базы данных
        /// </summary>
        /// <param name="context">Контекст базы данных</param>
        public static void SeedRoles(DatabaseEntities context)
        {
            if (!context.Ролиs.Any())
            {
                var roles = new[]
                {
                    new Роли { Название = "Администратор" },
                    new Роли { Название = "Пользователь" }
                };

                context.Ролиs.AddRange(roles);
                context.SaveChanges();
            }
        }
    }

}
