using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/sql")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        DatabaseContext db = DatabaseContext.GetContext();

        [HttpGet]
        //[Route("GetBooks")]
        public IEnumerable<Книги> GetBooks() => db.Книгиs.Take(db.Книгиs.Count());

        [HttpGet]
        [Route("GetAuthors")]
        public IEnumerable<Автор> GetAuthors() => db.Авторs.Take(db.Авторs.Count());

        [HttpGet]
        [Route("GetGenre")]
        public IEnumerable<Жанр> GetGenre() => db.Жанрs.Take(db.Жанрs.Count());

        [HttpGet]  
        [Route("GetReaders")]
        public IEnumerable<Читатели> GetReaders() => db.Читателиs.Take(db.Читателиs.Count());

        [HttpGet]
        [Route("GetBookDistr")]
        public IEnumerable<ВыдачаКниг> GetBookDistr() => db.ВыдачаКнигs.Take(db.ВыдачаКнигs.Count());


    }
}