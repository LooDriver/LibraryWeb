using Microsoft.AspNetCore.Mvc;
using LibraryWeb.Sql;
using LibraryWeb.Sql.Model;
using LibraryWeb.Sql.Context;
using Microsoft.EntityFrameworkCore;

namespace LibraryWeb.Integrations.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        DatabaseContext db = DatabaseContext.GetContext();

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public List<�����> Get()
        {
            List<�����> �����s = new List<�����>();
            db.�����s.Load();
            foreach(var item in db.�����s)
            {
                �����s.Add(item);
            }
            return �����s;
        }
    }
}