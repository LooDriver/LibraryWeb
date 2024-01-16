using LibraryWeb.Sql.Context;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers.TablesController
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        DatabaseContext db = DatabaseContext.GetContext();

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("allBooks")]
        public JsonResult GetBooks() => Json(db.Книгиs.Take(db.Книгиs.Count()));

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("{name?}")]
        public async Task<JsonResult> GetBookByName([FromQuery] string name) => Json(await db.Книгиs.FindAsync(db.Книгиs.First(x => x.Название == name).КодКниги));

    }
}
