using EasyData.Services;
using LibraryWeb.Integrations.Controllers;
using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Integrations.Services;
using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;

namespace LibraryWeb.Core
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            DatabaseEntities.connectionString = Configuration.GetConnectionString("MSSQLSERVER");
            services.AddControllersWithViews().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            services.AddDbContext<DatabaseEntities>(options =>
            {
                options.UseSqlServer(DatabaseEntities.connectionString);
            });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = AuthOptions.ISSUER,
                        ValidAudience = AuthOptions.AUDIENCE,

                        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });
            services.AddAuthorization();

            services.AddTransient<IBookRepository<Книги>, BookService>();
            services.AddScoped<ICartRepository<Корзина>, CartService>();
            services.AddScoped<IFavoriteRepository<Избранное>, FavoriteService>();
            services.AddScoped<IOrderRepository<Заказы>, OrderService>();
            services.AddScoped<IPickupPointRepository<ПунктыВыдачи>, PickupPointService>();
            services.AddScoped<IProfileRepository<Пользователи>, ProfileService>();
            services.AddScoped<IAuthRepository<Пользователи>, AuthService>();
            services.AddScoped<ICommentsRepository<Комментарии>, CommentService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseDefaultFiles();

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapEasyData(options =>
                {
                    options.UseDbContext<DatabaseEntities>();
                });
                endpoints.MapControllers();
            });
        }
    }
}
