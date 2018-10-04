let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;
  let newService = new Service.AirQualitySensor(s.name);
  s.characteristics.forEach(c => {
    switch (c.type) {
      case "AirQuality":
        newService
          .getCharacteristic(Characteristic.On)
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
              .getCharacteristic(Characteristic.AirQuality)
              .updateValue(payload.value);
          }
        });
        break;
      case "OzoneDensity":
        newService
          .getCharacteristic(Characteristic.OzoneDensity)
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
              .getCharacteristic(Characteristic.OzoneDensity)
              .updateValue(payload.value);
          }
        });
        break;
      case "NitrogenDioxideDensity":
        newService
          .getCharacteristic(Characteristic.NitrogenDioxideDensity)
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
              .getCharacteristic(Characteristic.NitrogenDioxideDensity)
              .updateValue(payload.value);
          }
        });
        break;
      case "SulphurDioxideDensity":
        newService
          .getCharacteristic(Characteristic.SulphurDioxideDensity)
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
              .getCharacteristic(Characteristic.SulphurDioxideDensity)
              .updateValue(payload.value);
          }
        });
        break;
      case "PM2_5Density":
        newService
          .getCharacteristic(Characteristic.PM2_5Density)
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
              .getCharacteristic(Characteristic.PM2_5Density)
              .updateValue(payload.value);
          }
        });
        break;
      case "PM10Density":
        newService
          .getCharacteristic(Characteristic.PM10Density)
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
              .getCharacteristic(Characteristic.PM10Density)
              .updateValue(payload.value);
          }
        });
        break;
      case "VOCDensity":
        newService
          .getCharacteristic(Characteristic.VOCDensity)
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
              .getCharacteristic(Characteristic.VOCDensity)
              .updateValue(payload.value);
          }
        });
        break;
      case "StatusActive":
        newService
          .getCharacteristic(Characteristic.StatusActive)
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
              .getCharacteristic(Characteristic.StatusActive)
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
