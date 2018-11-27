let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;
  let newService = new Service.GarageDoorOpener(s.name);
  s.characteristics.forEach(c => {
    switch (c.type) {
      case "CurrentDoorState":
        newService.getCharacteristic(Characteristic.CurrentDoorState).on("get", cb => {
          Bobaos.getValue(c.status)
            .then(payload => {
              cb(null, payload.value);
            })
            .catch(e => {
              cb(e);
            });
        });
        // register listener for bobaos
        Bobaos.on("value", payload => {
          if (payload.id === c.status) {
            newService.getCharacteristic(Characteristic.CurrentDoorState).updateValue(payload.value);
          }
        });
        break;
      case "TargetDoorState":
        newService.getCharacteristic(Characteristic.TargetDoorState).on("set", (value, cb) => {
          Bobaos.setValue({id: c.control, value: value})
            .then(_ => {
              cb(null);
            })
            .catch(e => {
              cb(e);
            });
        });
        break;
      case "ObstructionDetected":
        newService.getCharacteristic(Characteristic.ObstructionDetected).on("get", cb => {
          Bobaos.getValue(c.status)
            .then(payload => {
              cb(null, payload.value);
            })
            .catch(e => {
              cb(e);
            });
        });
        // register listener for bobaos
        Bobaos.on("datapoint value", payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              newService.getCharacteristic(Characteristic.ObstructionDetected).updateValue(payload.value);
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
      case "LockCurrentState":
        // TODO: implement
        break;
      case "LockTargetState":
        // TODO: implement
        break;
      default:
        break;
    }
  });

  return newService;
}

module.exports = initService;
