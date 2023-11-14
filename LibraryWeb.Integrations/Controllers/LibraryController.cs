using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace LibraryWeb.Integrations.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class LibraryController : ControllerBase
    {
        DatabaseContext db = DatabaseContext.GetContext();

        private readonly ILogger<LibraryController> _logger;

        public LibraryController(ILogger<LibraryController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("GetBooks")]
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