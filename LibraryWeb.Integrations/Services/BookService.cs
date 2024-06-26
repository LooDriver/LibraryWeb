﻿using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Services
{
    public class BookService : IBookRepository<Книги>
    {
        private readonly DatabaseEntities _dbContext;

        public BookService(DatabaseEntities dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Книги> GetAll() => [.. _dbContext.Книгиs.Take(_dbContext.Книгиs.Count())];

        public async Task<Книги> GetByNameAsync(string name) => await _dbContext.Книгиs.Include(publisher => publisher.КодИздательстваNavigation).AsNoTracking().FirstOrDefaultAsync(books => books.Название == name);
    }
}
