USE [Книжный_магазин]
GO
/****** Object:  Table [dbo].[Избранное]    Script Date: 25.02.2024 12:40:20 ******/
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
/****** Object:  Table [dbo].[Издательство]    Script Date: 25.02.2024 12:40:21 ******/
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
/****** Object:  Table [dbo].[Книги]    Script Date: 25.02.2024 12:40:21 ******/
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
	[Наличие] [int] NOT NULL,
 CONSTRAINT [PK_Книги] PRIMARY KEY CLUSTERED 
(
	[Код_книги] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Корзина]    Script Date: 25.02.2024 12:40:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Корзина](
	[Код_корзины] [int] IDENTITY(1,1) NOT NULL,
	[Код_пользователя] [int] NOT NULL,
	[Код_книги] [int] NOT NULL,
	[Цена] [money] NULL,
 CONSTRAINT [PK_Корзина] PRIMARY KEY CLUSTERED 
(
	[Код_корзины] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Пользователи]    Script Date: 25.02.2024 12:40:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Пользователи](
	[Код_пользователя] [int] IDENTITY(1,1) NOT NULL,
	[Логин] [nvarchar](50) NULL,
	[Пароль] [nvarchar](50) NULL,
	[Код_роли] [int] NULL,
 CONSTRAINT [PK_Пользователи] PRIMARY KEY CLUSTERED 
(
	[Код_пользователя] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Роли]    Script Date: 25.02.2024 12:40:21 ******/
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
