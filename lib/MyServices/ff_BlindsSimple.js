/*************************
 *
  accessories:
  - name: ShuttersCabinet1
    services:
    - type: BlindsSimple
      name: Shutters cabinet
      characteristics:
      - type: TargetPosition
        long: 297
        short: 298
 *
 **************************/

let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;

  // travel time, 10s by default
  let travelTime = 10000;
  let stopAtBoundaries = false;
  if (typeof s.travelTime !== "undefined") {
    travelTime = s.travelTime;
  }
  if (typeof s.stopAtBoundaries !== "undefined") {
    stopAtBoundaries = s.stopAtBoundaries;
  }

  // global for this scope
  let lastPosition = 0;
  let currentPositionState = 2;
  let currentTargetPosition = 0;
  let interval = null;
  let timeout = null;


  // init service
  let newService = new Service.WindowCovering(s.name);

  // current position
  newService
    .getCharacteristic(Characteristic.CurrentPosition)
    .on('get', (cb) => {
      cb(null, lastPosition);
    });

  newService
    .getCharacteristic(Characteristic.PositionState)
    .on('get', (cb) => {
      cb(null, currentPositionState);
    });
  s.characteristics.forEach(c => {
    switch (c.type) {
      case "TargetPosition":
        newService
          .getCharacteristic(Characteristic.TargetPosition)
          .on('get', (cb) => {
            cb(null, currentTargetPosition);
          })
          .on('set', (value, cb) => {
            currentTargetPosition = value;
            if (currentTargetPosition === lastPosition) {
              if (interval != null) clearInterval(interval);
              if (timeout != null) clearTimeout(timeout);
              cb(null);
              return;
            }
            const moveUp = (currentTargetPosition >= lastPosition);

            newService
              .setCharacteristic(Characteristic.PositionState, (moveUp ? 1 : 0));

            Bobaos
              .setValue(c.long, moveUp ? 1 : 0)
              .then(_ => {
                newService
                  .setCharacteristic(Characteristic.CurrentPosition, value);
                newService
                  .setCharacteristic(Characteristic.PositionState, 2);
              })
              .catch(e => {
                log(e);
              });


            if (interval != null) clearInterval(interval);
            if (timeout != null) clearTimeout(timeout);
            interval = setInterval(function () {
              lastPosition += (moveUp ? 1 : -1);
              if (lastPosition === currentTargetPosition) {
                if (currentTargetPosition !== 0 && currentTargetPosition !== 100) {
                  Bobaos.setValue(c.short, 1)
                    .then(_ => {
                      newService
                        .setCharacteristic(Characteristic.CurrentPosition, value);
                      newService
                        .setCharacteristic(Characteristic.PositionState, 2);
                      lastPosition = value;
                    })
                    .catch(e => {
                      log(e);
                    })
                }
                clearInterval(interval);
              }
            }, parseInt(travelTime) / 100);

            if (stopAtBoundaries && (currentTargetPosition === 0 || currentTargetPosition === 100)) {
              timeout = setTimeout(function () {
                Bobaos.setValue(c.short, 1)
                  .then(_ => {
                    // here comes success
                  })
                  .catch(e => {
                    log(e);
                  })
              }, parseInt(travelTime));
            }
            cb(null);
          });
        break;
      default:
        break;
    }
  });
  return newService;
}


module.exports = initService;
