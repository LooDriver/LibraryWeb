using LibraryWeb.Integrations.Interfaces;
using LibraryWeb.Sql.Context;
using LibraryWeb.Sql.Models;

namespace LibraryWeb.Integrations.Services
{
    public class PickupPointService : IPickupPointRepository<ПунктыВыдачи>
    {
        private readonly DatabaseEntities _dbContext;

        public PickupPointService(DatabaseEntities dbContext)
        {
            _dbContext = dbContext;
        }

        public List<ПунктыВыдачи> GetAll(int userID = 0) => [.. _dbContext.ПунктыВыдачиs.Take(_dbContext.ПунктыВыдачиs.Count())];
    }
}
