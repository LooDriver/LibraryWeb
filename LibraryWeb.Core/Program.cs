namespace LibraryWeb.Core
{
    class Program
    {
        public static WebApplication app { get; private set; }
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(new WebApplicationOptions { WebRootPath = "wwwroot" });

            builder.Services.AddRazorPages();

            builder.Services.AddControllers();

            builder.Services.AddSwaggerGen();

            app = builder.Build();

            app.UseStaticFiles();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.MapRazorPages();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}