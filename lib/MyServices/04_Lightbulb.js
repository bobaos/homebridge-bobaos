let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  // this variable serves to solve issue when you set brightness level and homebridge sends also
  // on/off command. It should switch On datapoint only if it is in different state
  let _OnOffState = null;
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;
  let newService = new Service.Lightbulb(s.name);
  s.characteristics.forEach(c => {
    switch (c.type) {
      case "On":
        newService
          .getCharacteristic(Characteristic.On)
          .on("set", (value, cb) => {
            log("set to: " + value.toString());
            if (value !== _OnOffState) {
              Bobaos.setValue({id: c.control, value: value})
                .then(_ => {
                  cb(null);
                  _OnOffState = value;
                })
                .catch(e => {
                  cb(e);
                });
            } else {
              cb(null);
            }
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
            newService.getCharacteristic(Characteristic.On).updateValue(payload.value);
          }
        });
        break;
      case "Brightness":
        newService
          .getCharacteristic(Characteristic.Brightness)
          .on("set", (value, cb) => {
            // setTimeout sends brightness value with delay. After On/Off command.
            setTimeout(_ => {
              Bobaos.setValue({id: c.control, value: Math.round(value * 2.55)})
                .then(_ => {
                  cb(null);
                })
                .catch(e => {
                  cb(e);
                });
            }, 300);
          })
          .on("get", cb => {
            Bobaos.getValue(c.status)
              .then(payload => {
                cb(null, Math.round(payload.value / 2.55));
              })
              .catch(e => {
                cb(e);
              });
          });
        Bobaos.on("value", payload => {
          if (payload.id === c.status) {
            newService.getCharacteristic(Characteristic.Brightness).updateValue(Math.round(payload.value / 2.55));
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
