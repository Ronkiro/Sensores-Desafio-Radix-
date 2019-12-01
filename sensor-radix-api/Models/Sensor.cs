using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace sensor_radix_api.Models
{
    public class Sensor
    {
        public long Id { get; set; }
        [Required]
        public string Tag { get; set; }
        public DateTime Timestamp { get; set; }
        public string Status { get; set; }
        public int Valor { get; set; }
    }
}