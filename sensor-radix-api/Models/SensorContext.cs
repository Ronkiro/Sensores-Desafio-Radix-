using Microsoft.EntityFrameworkCore;

namespace sensor_radix_api.Models
{
    public class SensorContext : DbContext
    {
        public SensorContext(DbContextOptions<SensorContext> options)
            : base(options)
        {
        }

        public DbSet<Sensor> Sensors { get; set; }
    }
}