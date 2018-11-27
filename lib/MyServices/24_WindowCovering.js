let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;
  let newService = new Service.WindowCovering(s.name);
  s.characteristics.forEach(c => {
    switch (c.type) {
      case "CurrentPosition":
        newService
          .getCharacteristic(Characteristic.CurrentPosition)
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
                .getCharacteristic(Characteristic.CurrentPosition)
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
      case "TargetPosition":
        newService
          .getCharacteristic(Characteristic.TargetPosition)
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
                .getCharacteristic(Characteristic.TargetPosition)
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
      case "PositionState":
        newService
          .getCharacteristic(Characteristic.PositionState)
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
                .getCharacteristic(Characteristic.PositionState)
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
      case "HoldPosition":
        newService
          .getCharacteristic(Characteristic.HoldPosition)
          .on('set', (value, cb) => {
            Bobaos
              .setValue({id: c.control, value: value})
              .then(_ => {
                cb(null);
              })
              .catch(e => {
                cb(e);
              });
          });
        break;
      case "ObstructionDetected":
        newService
          .getCharacteristic(Characteristic.ObstructionDetected)
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
                .getCharacteristic(Characteristic.OccupancyDetected)
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
