using EasyData.Services;
using LibraryWeb.Integrations.Controllers.AuthenticationController;
using LibraryWeb.Sql.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
                options.UseSqlServer("Server=localhost\\sqlexpress;Database=����������;Trusted_Connection=true;TrustServerCertificate=true");
            });
            builder.Services.AddAuthorization();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        // ���������, ����� �� �������������� �������� ��� ��������� ������
                        ValidateIssuer = true,
                        // ������, �������������� ��������
                        ValidIssuer = AuthOptions.ISSUER,
                        // ����� �� �������������� ����������� ������
                        ValidateAudience = true,
                        // ��������� ����������� ������
                        ValidAudience = AuthOptions.AUDIENCE,
                        // ����� �� �������������� ����� �������������
                        ValidateLifetime = true,
                        // ��������� ����� ������������
                        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                        // ��������� ����� ������������
                        ValidateIssuerSigningKey = true,
                    };
                });
            var app = builder.Build();

            // Configure the HTTP request pipeline


            app.UseStaticFiles();
            app.UseDefaultFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapEasyData(options =>
            {
                options.UseDbContext<DatabaseEntities>();
            });
            app.MapControllers();


            app.Run();
        }
    }
}