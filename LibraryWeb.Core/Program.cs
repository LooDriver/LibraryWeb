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

            builder.Services.AddSwaggerGen();

            builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            var app = builder.Build();

            

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.MapRazorPages();

            app.UseStaticFiles();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}