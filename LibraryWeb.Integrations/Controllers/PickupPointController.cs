using LibraryWeb.Sql.Context;
using Microsoft.AspNetCore.Mvc;

namespace LibraryWeb.Integrations.Controllers
{
    [Route("api/[controller]")]
    public class PickupController : Controller
    {
        DatabaseEntities db;
        public PickupController()
        {
            db = new DatabaseEntities();
        }

        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet("allPickupPoints")]
        public JsonResult GetPickupPoint() => Json(db.ПунктыВыдачиs.Take(db.ПунктыВыдачиs.Count()));
    }
}
