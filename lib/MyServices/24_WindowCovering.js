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
  let Angle_1, TgtPos, CurrPos, PosState, DirState;
  s.characteristics.forEach(c => {
    switch (c.type) {
      case "CurrentPosition":
        newService.getCharacteristic(Characteristic.CurrentPosition).on("get", cb => {
          Bobaos.getValue(c.status)
            .then(payload => {
              CurrPos = Math.round((payload.value / 255) * 100);
              cb(null, CurrPos);
            })
            .catch(e => {
              cb(e);
            });
        });
        // register listener for bobaos
        Bobaos.on("datapoint value", payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              CurrPos = Math.round((payload.value / 255) * 100);
              newService.getCharacteristic(Characteristic.CurrentPosition).updateValue(CurrPos);
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
          .on("set", (value, cb) => {
            TgtPos = Math.round((value / 100) * 255);
            Bobaos.setValue({ id: c.control, value: TgtPos })
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
                TgtPos = Math.round((payload.value / 255) * 100);
                cb(null, TgtPos);
              })
              .catch(e => {
                cb(e);
              });
          });
        // register listener for bobaos
        Bobaos.on("datapoint value", payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              TgtPos = Math.round((payload.value / 255) * 100);
              newService.getCharacteristic(Characteristic.TargetPosition).updateValue(TgtPos);
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
        DirState = 0;
        PosState = 0;
        newService.getCharacteristic(Characteristic.PositionState).on("get", cb => {
          Bobaos.getValue(c.status)
            .then(payload => {
              DirState = payload.value;
            })
            .catch(e => {
              cb(e);
            });
          Bobaos.getValue(c.status1)
            .then(payload => {
              PosState = payload.value;
            })
            .catch(e => {
              cb(e);
            });
          if (DirState === 0) {
            cb(null, DirState);
          } else {
            cb(null, 1 + PosState);
          }
        });
        // register listener for bobaos
        Bobaos.on("datapoint value", payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              if (payload.value === 0) {
                PosState = 0;
                newService.getCharacteristic(Characteristic.PositionState).updateValue(0);
              } else {
                PosState = 1;
                newService.getCharacteristic(Characteristic.PositionState).updateValue(PosState + DirState);
              }
            } else if (payload.id === c.status1) {
              DirState = paload.value;
              if (PosState === 1) {
                newService.getCharacteristic(Characteristic.PositionState).updateValue(1 + DirState);
              }
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
        newService.getCharacteristic(Characteristic.HoldPosition).on("set", (value, cb) => {
          Bobaos.setValue({ id: c.control, value: value })
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
              newService.getCharacteristic(Characteristic.OccupancyDetected).updateValue(payload.value);
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

      case "TargetHorizontalTiltAngle":
        newService
          .getCharacteristic(Characteristic.TargetHorizontalTiltAngle)
          .on("set", (value, cb) => {
            Angle_1 = Math.round(((value + 90) / 180) * 255);
            Bobaos.setValue({ id: c.control, value: Angle_1 })
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
                Angle_1 = Math.round(payload.value / 255 - 90);
                cb(null, Angle_1);
              })
              .catch(e => {
                cb(e);
              });
          });
        // register listener for bobaos
        Bobaos.on("datapoint value", payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              Angle_1 = Math.round(((payload.value + 90) / 180) * 255);
              newService.getCharacteristic(Characteristic.TargetHorizontalTiltAngle).updateValue(Angle_1);
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

      case "CurrentHorizontalTiltAngle":
        newService.getCharacteristic(Characteristic.CurrentHorizontalTiltAngle).on("get", cb => {
          Bobaos.getValue(c.status)
            .then(payload => {
              Angle_1 = Math.round(payload.value / 255 - 90);
              cb(null, Angle_1);
            })
            .catch(e => {
              cb(e);
            });
        });
        // register listener for bobaos
        Bobaos.on("datapoint value", payload => {
          const processSingleValue = payload => {
            if (payload.id === c.status) {
              Angle_1 = Math.round(((payload.value + 90) / 180) * 255);
              newService.getCharacteristic(Characteristic.CurrentHorizontalTiltAngle).updateValue(Angle_1);
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
