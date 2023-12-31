using System.Text.Json.Serialization;

namespace LibraryWeb.Core
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            var app = builder.Build();

            // Configure the HTTP request pipeline
            app.UseStaticFiles();
            app.UseDefaultFiles();

            app.UseRouting();
            app.MapControllers();

            app.Run();
        }
    }
}