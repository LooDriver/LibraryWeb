using System.Text.Json.Serialization;

namespace LibraryWeb.Core
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder();

            builder.Services.AddRazorPages();

            builder.Services.AddControllers();

            builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            var app = builder.Build();

            app.MapRazorPages();

            app.UseStaticFiles();

            app.UseDefaultFiles();

            app.UseHttpsRedirection();

            app.MapControllers();

            app.Run();
        }
    }
}