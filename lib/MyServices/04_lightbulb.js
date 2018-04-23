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
  if (Object.prototype.hasOwnProperty.call(Service, s.type)) {
    let newService = new Service[s.type](s.name);
    s.characteristics.forEach(c => {
      // TODO: depends on c.type
      switch (c.type) {
        case "On":
          newService
            .getCharacteristic(Characteristic.On)
            .on('set', (value, cb) => {
              Bobaos
                .setValue(c.control, value)
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
          Bobaos.on('value', payload => {
            if (payload.id === c.status) {
              newService
                .getCharacteristic(Characteristic.On)
                .updateValue(payload.value);
            }
          });
          break;
        case "Brightness":
          // TODO: implement
          break;
        case "Hue":
          // TODO: implement
          break;
        case "Saturation":
          // TODO: implement
          break;
        case "ColorTemperature":
          // TODO: implement
        default:
          break;
      }
    });
    return newService;
  } else {
    throw new RangeError('Unknown service, ' + s.type);
  }
}


module.exports = initService;
