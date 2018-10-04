let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;
  let newService = new Service.MotionSensor(s.name);
  s.characteristics.forEach(c => {
    switch (c.type) {
      case "MotionDetected":
        newService
          .getCharacteristic(Characteristic.MotionDetected)
          .on('get', (cb) => {
            Bobaos
              .getValue(c.status)
              .then(payload => {
                cb(null, payload.value);
              })
              .catch(e => {
                cb(e);
              });
          });
        // register listener for bobaos
        Bobaos.on('value', payload => {
          if (payload.id === c.status) {
            newService
              .getCharacteristic(Characteristic.MotionDetected)
              .updateValue(payload.value);
          }
        });
        break;
      case "StatusFault":
        newService
          .getCharacteristic(Characteristic.StatusFault)
          .on('get', (cb) => {
            Bobaos
              .getValue(c.status)
              .then(payload => {
                cb(null, payload.value);
              })
              .catch(e => {
                cb(e);
              });
          });
        // register listener for bobaos
        Bobaos.on('value', payload => {
          if (payload.id === c.status) {
            newService
              .getCharacteristic(Characteristic.StatusFault)
              .updateValue(payload.value);
          }
        });
        break;
      case "StatusTampered":
        newService
          .getCharacteristic(Characteristic.StatusTampered)
          .on('get', (cb) => {
            Bobaos
              .getValue(c.status)
              .then(payload => {
                cb(null, payload.value);
              })
              .catch(e => {
                cb(e);
              });
          });
        // register listener for bobaos
        Bobaos.on('value', payload => {
          if (payload.id === c.status) {
            newService
              .getCharacteristic(Characteristic.StatusTampered)
              .updateValue(payload.value);
          }
        });
        break;
      case "StatusLowBattery":
        newService
          .getCharacteristic(Characteristic.StatusLowBattery)
          .on('get', (cb) => {
            Bobaos
              .getValue(c.status)
              .then(payload => {
                cb(null, payload.value);
              })
              .catch(e => {
                cb(e);
              });
          });
        // register listener for bobaos
        Bobaos.on('value', payload => {
          if (payload.id === c.status) {
            newService
              .getCharacteristic(Characteristic.StatusLowBattery)
              .updateValue(payload.value);
          }
        });
        break;
      default:
        break;
    }
  });
  return newService;
}


module.exports = initService;
