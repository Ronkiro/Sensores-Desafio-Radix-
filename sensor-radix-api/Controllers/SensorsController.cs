using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sensor_radix_api.Models;

namespace sensor_radix_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorsController : ControllerBase
    {
        private readonly SensorContext _context;
        private const int TAG_FORMAT_COUNT = 3;

        public SensorsController(SensorContext context)
        {
            _context = context;
        }

        // GET: api/Sensors
        [HttpGet]
        [EnableCors("AllowAnyOrigin")]
        public async Task<ActionResult<IEnumerable<Sensor>>> GetSensors()
        {
            return await _context.Sensors.ToListAsync();
        }

        // GET: api/Sensors/5
        [HttpGet("{id}")]
        [EnableCors("AllowAnyOrigin")]
        public async Task<ActionResult<Sensor>> GetSensor(long id)
        {
            var sensor = await _context.Sensors.FindAsync(id);

            if (sensor == null)
            {
                return NotFound();
            }

            return sensor;
        }

        // POST: api/Sensors
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [EnableCors("AllowAnyOrigin")]
        public async Task<ActionResult<Sensor>> PostSensor(Sensor sensor)
        {
            /* Tag tem formato <país>.<região>.<sensor> */
            bool tagOk = sensor.Tag.Split('.').Count() == TAG_FORMAT_COUNT;

            /* Valor vem como string mas tem que ser parsable como int */
            bool valorOk = Int32.TryParse(sensor.Valor, out int valor);

            if (tagOk)
            {
                sensor.Status = valorOk ? "Processado" : "Erro";

                _context.Sensors.Add(sensor);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetSensor", new { id = sensor.Id }, sensor);
            }

            return UnprocessableEntity();
        }

        private bool SensorExists(long id)
        {
            return _context.Sensors.Any(e => e.Id == id);
        }
    }
}
