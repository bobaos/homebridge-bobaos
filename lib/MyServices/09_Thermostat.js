let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;
  let newService = new Service.Thermostat(s.name);
  s.characteristics.forEach(c => {
    switch (c.type) {
      case "CurrentHeatingCoolingState":
        newService.getCharacteristic(Characteristic.CurrentHeatingCoolingState).on("get", cb => {
          // 0, 1, 2: off, heat, cool
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
            newService.getCharacteristic(Characteristic.CurrentHeatingCoolingState).updateValue(payload.value);
          }
        });
        break;
      case "CurrentTemperature":
        newService.getCharacteristic(Characteristic.CurrentTemperature).on("get", cb => {
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
            newService.getCharacteristic(Characteristic.CurrentTemperature).updateValue(payload.value);
          }
        });
        break;
      case "TargetTemperature":
        newService
          .getCharacteristic(Characteristic.TargetTemperature)
          .on("set", (value, cb) => {
            Bobaos.setValue({id: c.control, value: value})
              .then(_ => {
                cb(null);
              })
              .catch(e => {
                cb(e);
              });
          })
          .on("get", cb => {
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
            newService.getCharacteristic(Characteristic.TargetTemperature).updateValue(payload.value);
          }
        });
        break;
      case "TargetHeatingCoolingState":
        newService
          .getCharacteristic(Characteristic.TargetHeatingCoolingState)
          .on("set", (value, cb) => {
            Bobaos.setValue({id: c.control, value: value})
              .then(_ => {
                cb(null);
              })
              .catch(e => {
                cb(e);
              });
          })
          .on("get", cb => {
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
            newService.getCharacteristic(Characteristic.TargetHeatingCoolingState).updateValue(payload.value);
          }
        });
        break;
      case "TemperatureDisplayUnits":
        newService
          .getCharacteristic(Characteristic.TemperatureDisplayUnits)
          .on("set", (value, cb) => {
            Bobaos.setValue({id: c.control, value: value})
              .then(_ => {
                cb(null);
              })
              .catch(e => {
                cb(e);
              });
          })
          .on("get", cb => {
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
            newService.getCharacteristic(Characteristic.TemperatureDisplayUnitss).updateValue(payload.value);
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
