const convert = require("color-convert");

let Service, Characteristic;
let Bobaos;
let log;

function initService(params) {
  // this variable serves to solve issue when you set brightness level and homebridge sends also
  // on/off command. It should switch On datapoint only if it is in different state
  let _OnOffState = null;
  // current values
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
  let r_control, r_status, r_value;
  let g_control, g_status, g_value;
  let b_control, b_status, b_value;

  on_control = s.datapoints.on_control;
  on_status = s.datapoints.on_status;
  r_control = s.datapoints.r_control;
  r_status = s.datapoints.r_status;
  g_control = s.datapoints.g_control;
  g_status = s.datapoints.g_status;
  b_control = s.datapoints.b_control;
  b_status = s.datapoints.b_status;

  // ON/OFF
  newService
    .getCharacteristic(Characteristic.On)
    .on("set", (value, cb) => {
      log("set to: " + value.toString());
      if (value !== _OnOffState) {
        Bobaos.setValue({id: on_control, value: value})
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
    .on("get", async cb => {
      let value = (await Bobaos.getValue(on_status)).value;
      cb(null, value);
    });

  newService
    .getCharacteristic(Characteristic.Hue)
    .on("set", async (value, cb) => {
      _hue = value;
      console.log(_hue, _saturation, _brightness);
      let rgb = convert.hsl.rgb(_hue, _saturation, _brightness);
      let values = [];
      values.push({ id: r_control, value: rgb[0] });
      values.push({ id: g_control, value: rgb[1] });
      values.push({ id: b_control, value: rgb[2] });
      console.log(values);
      await Bobaos.setValue(values);
      cb(null);
    })
    .on("get", async cb => {
      cb(_hue);
    });

  newService
    .getCharacteristic(Characteristic.Saturation)
    .on("set", async (value, cb) => {
      _saturation = value;
      let rgb = convert.hsl.rgb(_hue, _saturation, _brightness);
      let values = [];
      values.push({ id: r_control, value: rgb[0] });
      values.push({ id: g_control, value: rgb[1] });
      values.push({ id: b_control, value: rgb[2] });
      console.log(values);
      await Bobaos.setValue(values);
      cb(null);
    })
    .on("get", cb => {
      cb(_saturation);
    });

  newService
    .getCharacteristic(Characteristic.Brightness)
    .on("set", async (value, cb) => {
      _brightness = value;
      let rgb = convert.hsl.rgb(_hue, _saturation, _brightness);
      let values = [];
      values.push({ id: r_control, value: rgb[0] });
      values.push({ id: g_control, value: rgb[1] });
      values.push({ id: b_control, value: rgb[2] });
      console.log(values);
      await Bobaos.setValue(values);
      cb(null);
    })
    .on("get", async cb => {
      cb(null, _brightness);
    });

  // register listener for bobaos
  Bobaos.on("value", payload => {
    if (payload.id === on_status) {
      newService.getCharacteristic(Characteristic.On).updateValue(payload.value);
    }
    // TODO: rgb to hue then update chars
  });

  return newService;
}

module.exports = initService;
