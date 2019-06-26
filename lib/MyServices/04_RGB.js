const convert = require("color-convert");

let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  // this variable serves to solve issue when you set brightness level and homebridge sends also
  // on/off command. It should switch On datapoint only if it is in different state
  let _OnOffState = null;

  let _hue = 0,
    _saturation = 0,
    _brightness = 0;

  Service = params.Service;
  Characteristic = params.Characteristic;
  Bobaos = params.Bobaos;
  let s = params.config;
  log = params.log;
  let newService = new Service.Lightbulb(s.name);

  let on_control, on_status;
  let rgb_control, rgb_status, rgb_raw;
  let rgb, rgb1;
  let hsl, hsl1;

  s.characteristics.forEach(c => {
    switch (c.type) {
      case "On":
        on_control = c.control;
        on_status = c.status;
        break;
      case "RGB":
        rgb_control = c.control;
        rgb_status = c.status;
        //log (rgb_control.toString());
        break;
      default:
        break;
    }
  });

  s.characteristics.forEach(c => {
    switch (c.type) {
      case "On":
        newService
          .getCharacteristic(Characteristic.On)
          .on("set", (value, cb) => {
            log("set to: " + value.toString());
            if (value === _OnOffState) {
              return cb(null);
            }
            Bobaos.setValue({ id: on_control, value: value })
              .then(_ => {
                _OnOffState = value;
                cb(null);
              })
              .catch(e => {
                cb(e);
              });
          })
          .on("get", cb => {
            Bobaos.getValue(on_status)
              .then(payload => {
                cb(null, payload.value);
              })
              .catch(e => {
                cb(e);
              });
          });
        break;
      case "RGB":
        newService
          .getCharacteristic(Characteristic.Hue)
          .on("set", (value, cb) => {
            //log("set to: " + value.toString());
            if (value === _hue) {
              return cb(null);
            }

            _hue = value;
            rgb = convert.hsl.rgb(_hue, _saturation, _brightness);
            rgb1 = Buffer.from(rgb);
            rgb_raw = rgb1.toString("base64");

            Bobaos.setValue({ id: rgb_control, raw: rgb_raw })
              .then(_ => {
                cb(null);
              })
              .catch(e => {
                cb(e);
              });
          })
          .on("get", cb => {
            Bobaos.getValue(rgb_status)
              .then(payload => {
                hsl1 = Buffer.from(payload.raw, "base64");
                hsl = convert.rgb.hsl(hsl1);
                _brightness = hsl[2];
                if (hsl[2] > 10) {
                  _hue = hsl[0];
                  _saturation = hsl[1];
                }
                cb(null, _hue);
              })
              .catch(e => {
                cb(e);
              });
          });

        newService
          .getCharacteristic(Characteristic.Saturation)
          .on("set", (value, cb) => {
            //log("set to: " + value.toString());
            if (value === _saturation) {
              return cb(null);
            }

            _saturation = value;
            rgb = convert.hsl.rgb(_hue, _saturation, _brightness);
            rgb1 = Buffer.from(rgb);
            rgb_raw = rgb1.toString("base64");

            Bobaos.setValue({ id: rgb_control, raw: rgb_raw })
              .then(_ => {
                cb(null);
              })
              .catch(e => {
                cb(e);
              });
          })
          .on("get", cb => {
            Bobaos.getValue(rgb_status)
              .then(payload => {
                hsl1 = Buffer.from(payload.raw, "base64");
                hsl = convert.rgb.hsl(hsl1);
                _brightness = hsl[2];
                if (hsl[2] > 10) {
                  _hue = hsl[0];
                  _saturation = hsl[1];
                }
                cb(null, _saturation);
              })
              .catch(e => {
                cb(e);
              });
          });

        newService
          .getCharacteristic(Characteristic.Brightness)
          .on("set", (value, cb) => {
            log("set to: " + value.toString());

            if (value === _brightness) {
              return cb(null);
            }
            _brightness = value;
            rgb = convert.hsl.rgb(_hue, _saturation, _brightness);
            rgb1 = Buffer.from(rgb);
            rgb_raw = rgb1.toString("base64");

            Bobaos.setValue({ id: rgb_control, raw: rgb_raw })
              .then(_ => {
                cb(null);
              })
              .catch(e => {
                cb(e);
              });
          })
          .on("get", cb => {
            Bobaos.getValue(rgb_status)
              .then(payload => {
                hsl1 = Buffer.from(payload.raw, "base64");
                hsl = convert.rgb.hsl(hsl1);
                _brightness = hsl[2];
                if (hsl[2] > 10) {
                  _hue = hsl[0];
                  _saturation = hsl[1];
                }
                cb(null, _brightness);
              })
              .catch(e => {
                cb(e);
              });
          });
        break;
      default:
        break;
    }
  });
  // register listener for bobaos
  Bobaos.on("datapoint value", payload => {
    const processSingleValue = payload => {
      if (payload.id === rgb_status) {
        hsl1 = Buffer.from(payload.raw, "base64");
        hsl = convert.rgb.hsl(hsl1);
        _brightness = hsl[2];
        if (hsl[2] > 10) {
          _hue = hsl[0];
          _saturation = hsl[1];
        }
        log(payload.raw + "  RGB - Brightness  " + hsl1[2].toString());
        newService.getCharacteristic(Characteristic.Hue).updateValue(_hue);
        newService.getCharacteristic(Characteristic.Saturation).updateValue(_saturation);
        newService.getCharacteristic(Characteristic.Brightness).updateValue(_brightness);
      }
      if (payload.id === on_status) {
        newService.getCharacteristic(Characteristic.On).updateValue(payload.value);
      }
    };
    if (Array.isArray(payload)) {
      return payload.forEach(processSingleValue);
    }
    if (typeof payload === "object") {
      return processSingleValue(payload);
    }
  });

  return newService;
}

module.exports = initService;
