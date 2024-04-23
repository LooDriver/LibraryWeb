using LibraryWeb.Core;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LibraryWeb.IntegrationsTests.SetupEnviroment
{
    public class TestStartup : Startup
    {
        public TestStartup(IConfiguration configuration, IWebHostEnvironment currentEnvironment) : base(configuration, currentEnvironment) { }

        public override void ConfigureDependencies(IServiceCollection services)
        {
            base.ConfigureDependencies(services);
        }
    }
}
