let faker = require('faker');
let tags = ['brasil.sudeste.sensor01', 'brasil.nordeste.sensor01',
              'brasil.sudeste.sensor03', 'brasil.norte.sensor02',
              'brasil.sul.sensor01']
let generateWorkers = () => {
    let workers = [];

    for (let id = 0; id < 200; id++) {
        let timestamp = faker.date.recent();
        let tag = tags[faker.random.number(tags.length-1)];
        let valor = faker.random.number();

        workers.push({
            "id": id,
            "timestamp": timestamp,
            "tag": tag,
            "valor": valor
        });
    }

    return { "data": workers }
}
module.exports = generateWorkers