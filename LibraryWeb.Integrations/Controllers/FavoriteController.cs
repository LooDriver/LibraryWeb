using LibraryWeb.Sql.Context;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class FavoriteController : Controller
    {
        DatabaseEntities db;

        public FavoriteController()
        {
            db = new DatabaseEntities();
        }


        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("getFavorite")]
        public IActionResult GetAllFavorite() => Json(db.Избранноеs.Take(db.Избранноеs.Count()));
    }
}
