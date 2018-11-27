let Service, Characteristic;
let Bobaos;
let log;

// required chars: On
// optional chars: RotationDirection, RotationSpeed, Name
function initService(params) {
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;
  let newService = new Service.LockMechanism(s.name);
  s.characteristics.forEach(c => {
    switch (c.type) {
      case 'LockTargetState':
        newService
          .getCharacteristic(Characteristic.LockTargetState)
          .on('set', (value, cb) => {
            Bobaos.setValue({id: c.control, value: value})
              .then(_ => {
                cb(null);
              })
              .catch(e => {
                cb(e);
              });
          })
          .on('get', cb => {
            Bobaos.getValue(c.status)
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
                .getCharacteristic(Characteristic.LockTargetState)
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
      case 'LockCurrentState':
        newService
          .getCharacteristic(Characteristic.LockCurrentState)
          .on('get', cb => {
            Bobaos.getValue(c.status)
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
              .getCharacteristic(Characteristic.LockCurrentState)
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
