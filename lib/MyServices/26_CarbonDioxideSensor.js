let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;
  let newService = new Service.CarbonDioxideSensor(s.name);
  s.characteristics.forEach(c => {
    switch (c.type) {
      case "CarbonDioxideDetected":
        newService
          .getCharacteristic(Characteristic.CarbonDioxideDetected)
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
        Bobaos.on('datapoint value', payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              newService
                .getCharacteristic(Characteristic.CarbonDioxideDetected)
                .updateValue(payload.value);
            }
          };
          if (Array.isArray(payload)) {
            return payload.forEach(processSingleValue);
          }
          if (typeof payload === "object") {
            return processSingleValue(payload);
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
        Bobaos.on('datapoint value', payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              newService
                .getCharacteristic(Characteristic.StatusActive)
                .updateValue(payload.value);
            }
          };
          if (Array.isArray(payload)) {
            return payload.forEach(processSingleValue);
          }
          if (typeof payload === "object") {
            return processSingleValue(payload);
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
        Bobaos.on('datapoint value', payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              newService
                .getCharacteristic(Characteristic.StatusFault)
                .updateValue(payload.value);
            }
          };
          if (Array.isArray(payload)) {
            return payload.forEach(processSingleValue);
          }
          if (typeof payload === "object") {
            return processSingleValue(payload);
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
        Bobaos.on('datapoint value', payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              newService
                .getCharacteristic(Characteristic.StatusTampered)
                .updateValue(payload.value);
            }
          };
          if (Array.isArray(payload)) {
            return payload.forEach(processSingleValue);
          }
          if (typeof payload === "object") {
            return processSingleValue(payload);
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
        Bobaos.on('datapoint value', payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              newService
                .getCharacteristic(Characteristic.StatusLowBattery)
                .updateValue(payload.value);
            }
          };
          if (Array.isArray(payload)) {
            return payload.forEach(processSingleValue);
          }
          if (typeof payload === "object") {
            return processSingleValue(payload);
          }
        });
        break;
      case "CarbonDioxidePeakLevel":
        newService
          .getCharacteristic(Characteristic.CarbonDioxidePeakLevel)
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
        Bobaos.on('datapoint value', payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              newService
                .getCharacteristic(Characteristic.CarbonDioxidePeakLevel)
                .updateValue(payload.value);
            }
          };
          if (Array.isArray(payload)) {
            return payload.forEach(processSingleValue);
          }
          if (typeof payload === "object") {
            return processSingleValue(payload);
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
