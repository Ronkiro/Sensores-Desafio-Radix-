using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public SensorsController(SensorContext context)
        {
            _context = context;
        }

        // GET: api/Sensors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sensor>>> GetSensors()
        {
            return await _context.Sensors.ToListAsync();
        }

        // GET: api/Sensors/5
        [HttpGet("{id}")]
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
        [HttpPost]
        public async Task<ActionResult<Sensor>> PostSensor([FromBody] InputSensor sensor)
        {    
            // Validação do Timestamp
            DateTime dtDateTime;
            if(sensor.Timestamp > 1) {
                var isDateTimeParsable = long.TryParse(sensor.Timestamp.ToString(), 
                                                    out var unixTimeStamp);
                
                if(!isDateTimeParsable) { return BadRequest(); } // Não é um UnixTimeStamp
                
                dtDateTime = UnixToDateTime(unixTimeStamp);
            } else { dtDateTime = DateTime.Now; }

            // Validação do valor e processamento de status
            bool isValorParsed = Int32.TryParse(sensor.Valor, out int valor);
            string status = isValorParsed ? "Processado" : "Erro";
            
            // Validação da tag
            var tag = sensor.Tag.Split('.');
            if(tag.Count() != 3) { return BadRequest(); }

            Sensor newSensor = new Sensor {
                Tag = sensor.Tag,
                Valor = valor,
                Timestamp = dtDateTime,
                Status = status
            };

            _context.Sensors.Add(newSensor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSensor", new { id = newSensor.Id }, newSensor);
        }

        private DateTime UnixToDateTime(long timeStamp)
        {
            System.DateTime dtDateTime = new DateTime(1970,1,1,0,0,0,0,System.DateTimeKind.Utc);
            return dtDateTime.AddSeconds( timeStamp ).ToLocalTime();
        }

        private bool SensorExists(long id)
        {
            return _context.Sensors.Any(e => e.Id == id);
        }
    }
}
