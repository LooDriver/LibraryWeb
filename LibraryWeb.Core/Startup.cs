using Microsoft.OpenApi.Models;

namespace LibraryWeb.Core
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // ...

            // Добавьте маршрут для Swagger UI
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "swagger",
                    pattern: "swagger/{action=Index}",
                    defaults: new { controller = "Swagger" });
            });

            // Добавьте middleware для Swagger UI
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API V1");
                // Установите путь для переадресации
                c.RoutePrefix = "swagger";
            });
        }
    }
}
