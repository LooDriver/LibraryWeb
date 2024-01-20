using EasyData.Services;
using LibraryWeb.Sql.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.Json.Serialization;

namespace LibraryWeb.Core
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            builder.Services.AddDbContext<DatabaseEntities>(options =>
            {
                options.UseSqlServer("Server=localhost\\sqlexpress;Database=Библиотека;Trusted_Connection=true;TrustServerCertificate=true");
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline
            app.UseStaticFiles();
            app.UseDefaultFiles();

            app.UseRouting();
            app.MapEasyData(options =>
            {
                options.UseDbContext<DatabaseEntities>();
            });
            app.MapControllers();
          
                     
            app.Run();
        }
    }
}