let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;
  let newService = new Service.SecuritySystem(s.name);
  s.characteristics.forEach(c => {
    switch (c.type) {
      case "SecuritySystemCurrentState":
        newService
          .getCharacteristic(Characteristic.SecuritySystemCurrentState)
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
                .getCharacteristic(Characteristic.SecuritySystemCurrentState)
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
      case "SecuritySystemTargetState":
        newService
          .getCharacteristic(Characteristic.SecuritySystemTargetState)
          .on('set', (value, cb) => {
            Bobaos
              .setValue({id: c.control, value: value})
              .then(_ => {
                cb(null);
              })
              .catch(e => {
                cb(e);
              });
          })
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
                .getCharacteristic(Characteristic.SecuritySystemTargetState)
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
      case "SecuritySystemAlarmType":
        newService
          .getCharacteristic(Characteristic.SecuritySystemAlarmType)
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
                .getCharacteristic(Characteristic.SecuritySystemAlarmType)
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
      default:
        break;
    }
  });
  return newService;
}


module.exports = initService;
