USE [Книжный_магазин]
GO
/****** Object:  Table [dbo].[Заказы]    Script Date: 03.03.2024 13:02:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Заказы](
	[Код_заказа] [int] IDENTITY(1,1) NOT NULL,
	[Код_пункта_выдачи] [int] NULL,
	[Код_пользователя] [int] NOT NULL,
	[Код_книги] [int] NOT NULL,
	[Дата_заказа] [date] NOT NULL,
	[Статус] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Заказы] PRIMARY KEY CLUSTERED 
(
	[Код_заказа] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Избранное]    Script Date: 03.03.2024 13:02:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Избранное](
	[Код_избранного] [int] IDENTITY(1,1) NOT NULL,
	[Код_книги] [int] NOT NULL,
	[Код_пользователя] [int] NOT NULL,
	[Количество] [int] NULL,
 CONSTRAINT [PK_Избранное] PRIMARY KEY CLUSTERED 
(
	[Код_избранного] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Издательство]    Script Date: 03.03.2024 13:02:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Издательство](
	[Код_издательства] [int] IDENTITY(1,1) NOT NULL,
	[Название] [nvarchar](50) NULL,
	[Адрес] [nvarchar](50) NULL,
	[Директор] [nvarchar](50) NULL,
 CONSTRAINT [PK_Издательство] PRIMARY KEY CLUSTERED 
(
	[Код_издательства] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Книги]    Script Date: 03.03.2024 13:02:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Книги](
	[Код_книги] [int] IDENTITY(1,1) NOT NULL,
	[Код_издательства] [int] NOT NULL,
	[Жанр] [nvarchar](50) NOT NULL,
	[Автор] [nvarchar](50) NOT NULL,
	[Название] [nvarchar](50) NOT NULL,
	[Обложка] [varbinary](max) NULL,
	[Описание] [nvarchar](150) NULL,
	[Цена] [money] NOT NULL,
	[Наличие] [int] NOT NULL,
 CONSTRAINT [PK_Книги] PRIMARY KEY CLUSTERED 
(
	[Код_книги] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Корзина]    Script Date: 03.03.2024 13:02:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Корзина](
	[Код_корзины] [int] IDENTITY(1,1) NOT NULL,
	[Код_пользователя] [int] NOT NULL,
	[Код_книги] [int] NOT NULL,
 CONSTRAINT [PK_Корзина] PRIMARY KEY CLUSTERED 
(
	[Код_корзины] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Пользователи]    Script Date: 03.03.2024 13:02:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Пользователи](
	[Код_пользователя] [int] IDENTITY(1,1) NOT NULL,
	[Фамилия] [nvarchar](50) NOT NULL,
	[Имя] [nvarchar](50) NOT NULL,
	[Логин] [nvarchar](50) NOT NULL,
	[Пароль] [nvarchar](50) NOT NULL,
	[Фото] [varbinary](max) NULL,
	[Код_роли] [int] NOT NULL,
 CONSTRAINT [PK_Пользователи] PRIMARY KEY CLUSTERED 
(
	[Код_пользователя] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Пункты_выдачи]    Script Date: 03.03.2024 13:02:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Пункты_выдачи](
	[Код_пункта_выдачи] [int] IDENTITY(1,1) NOT NULL,
	[Название] [nvarchar](50) NULL,
	[Адрес] [nvarchar](150) NULL,
 CONSTRAINT [PK_Пункты_выдачи] PRIMARY KEY CLUSTERED 
(
	[Код_пункта_выдачи] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Роли]    Script Date: 03.03.2024 13:02:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Роли](
	[Код_роли] [int] IDENTITY(1,1) NOT NULL,
	[Название] [nvarchar](50) NULL,
 CONSTRAINT [PK_Роли] PRIMARY KEY CLUSTERED 
(
	[Код_роли] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Заказы]  WITH CHECK ADD  CONSTRAINT [FK_Заказы_Книги] FOREIGN KEY([Код_книги])
REFERENCES [dbo].[Книги] ([Код_книги])
GO
ALTER TABLE [dbo].[Заказы] CHECK CONSTRAINT [FK_Заказы_Книги]
GO
ALTER TABLE [dbo].[Заказы]  WITH CHECK ADD  CONSTRAINT [FK_Заказы_Пользователи] FOREIGN KEY([Код_пользователя])
REFERENCES [dbo].[Пользователи] ([Код_пользователя])
GO
ALTER TABLE [dbo].[Заказы] CHECK CONSTRAINT [FK_Заказы_Пользователи]
GO
ALTER TABLE [dbo].[Заказы]  WITH CHECK ADD  CONSTRAINT [FK_Заказы_Пункты_выдачи] FOREIGN KEY([Код_пункта_выдачи])
REFERENCES [dbo].[Пункты_выдачи] ([Код_пункта_выдачи])
GO
ALTER TABLE [dbo].[Заказы] CHECK CONSTRAINT [FK_Заказы_Пункты_выдачи]
GO
ALTER TABLE [dbo].[Избранное]  WITH CHECK ADD  CONSTRAINT [FK_Избранное_Книги] FOREIGN KEY([Код_книги])
REFERENCES [dbo].[Книги] ([Код_книги])
GO
ALTER TABLE [dbo].[Избранное] CHECK CONSTRAINT [FK_Избранное_Книги]
GO
ALTER TABLE [dbo].[Избранное]  WITH CHECK ADD  CONSTRAINT [FK_Избранное_Пользователи] FOREIGN KEY([Код_пользователя])
REFERENCES [dbo].[Пользователи] ([Код_пользователя])
GO
ALTER TABLE [dbo].[Избранное] CHECK CONSTRAINT [FK_Избранное_Пользователи]
GO
ALTER TABLE [dbo].[Книги]  WITH CHECK ADD  CONSTRAINT [FK_Книги_Издательство] FOREIGN KEY([Код_издательства])
REFERENCES [dbo].[Издательство] ([Код_издательства])
GO
ALTER TABLE [dbo].[Книги] CHECK CONSTRAINT [FK_Книги_Издательство]
GO
ALTER TABLE [dbo].[Корзина]  WITH CHECK ADD  CONSTRAINT [FK_Корзина_Книги] FOREIGN KEY([Код_книги])
REFERENCES [dbo].[Книги] ([Код_книги])
GO
ALTER TABLE [dbo].[Корзина] CHECK CONSTRAINT [FK_Корзина_Книги]
GO
ALTER TABLE [dbo].[Корзина]  WITH CHECK ADD  CONSTRAINT [FK_Корзина_Пользователи] FOREIGN KEY([Код_пользователя])
REFERENCES [dbo].[Пользователи] ([Код_пользователя])
GO
ALTER TABLE [dbo].[Корзина] CHECK CONSTRAINT [FK_Корзина_Пользователи]
GO
ALTER TABLE [dbo].[Пользователи]  WITH CHECK ADD  CONSTRAINT [FK_Пользователи_Роли] FOREIGN KEY([Код_роли])
REFERENCES [dbo].[Роли] ([Код_роли])
GO
ALTER TABLE [dbo].[Пользователи] CHECK CONSTRAINT [FK_Пользователи_Роли]
GO
USE [master]
GO
ALTER DATABASE [Книжный_магазин] SET  READ_WRITE 
GO
