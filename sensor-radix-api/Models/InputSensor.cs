/*
    Uma classe-modelo dos dados recebidos pelos sensores
    (INPUT)

    JSON EXEMPLO:
            {
                "tag": "abcde",
                "timestamp": 1575179924,
                "valor": 1231
            }
*/

namespace sensor_radix_api.Models
{
    public class InputSensor
    {
        public string Tag { get; set; }
        public long Timestamp { get; set; }
        public string Valor { get; set; }
    }
}