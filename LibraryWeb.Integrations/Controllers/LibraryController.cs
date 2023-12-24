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
        public IEnumerable<�����> GetBooks() => db.�����s.Take(db.�����s.Count());

        [HttpGet]
        [Route("GetAuthors")]
        public IEnumerable<�����> GetAuthors() => db.�����s.Take(db.�����s.Count());

        [HttpGet]
        [Route("GetGenre")]
        public IEnumerable<����> GetGenre() => db.����s.Take(db.����s.Count());

        [HttpGet]  
        [Route("GetReaders")]
        public IEnumerable<��������> GetReaders() => db.��������s.Take(db.��������s.Count());

        [HttpGet]
        [Route("GetBookDistr")]
        public IEnumerable<����������> GetBookDistr() => db.����������s.Take(db.����������s.Count());


    }
}