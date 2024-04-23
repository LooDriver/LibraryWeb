using LibraryWeb.Core;
using LibraryWeb.Sql.Context;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

namespace LibraryWeb.IntegrationsTests.SetupEnviroment
{
    public class BaseTestServerFixture : IDisposable
    {
        public TestServer TestServer { get; }
        public DatabaseEntities DbContext { get; }
        public HttpClient Client { get; }

        public BaseTestServerFixture()
        {
            var builder = new WebHostBuilder()
                .UseEnvironment("Testing")
                .UseStartup<Startup>();

            TestServer = new TestServer(builder);
            Client = TestServer.CreateClient();
            DbContext = TestServer.Host.Services.GetService<DatabaseEntities>();
            FillData();
        }

        private void FillData()
        {
            TestDataSeeder.SeedPublishers(DbContext);
            TestDataSeeder.SeedBooks(DbContext);
            TestDataSeeder.SeedRoles(DbContext);
            TestDataSeeder.SeedUsers(DbContext);
            TestDataSeeder.SeedOrders(DbContext);
            TestDataSeeder.SeedPublishers(DbContext);
            TestDataSeeder.SeedComments(DbContext);
            TestDataSeeder.SeedPickupPoints(DbContext);
            TestDataSeeder.SeedCarts(DbContext);
            TestDataSeeder.SeedFavorites(DbContext);
        }

        public void Dispose()
        {
            Client.Dispose();
            TestServer.Dispose();
        }
    }
}
