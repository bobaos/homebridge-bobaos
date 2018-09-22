const MyFanService = require("./02_Fan");
const MyGarageDoorOpener = require("./03_GarageDoorOpener");
const MyLightBulbService = require("./04_Lightbulb");
const MyRgb = require("./04_RGB");
const MySwitchService = require("./08_Switch");
const MyBlindsSimple = require("./ff_BlindsSimple");
const MyThermostatSimple = require("./09_Thermostat");
const MyLeakSensor = require("./16_LeakSensor");

module.exports = [
  {
    type: "Fan",
    init: MyFanService
  },
  {
    type: "Lightbulb",
    init: MyLightBulbService
  },
  {
    type: "RGB",
    init: MyRgb
  },
  {
    type: "Switch",
    init: MySwitchService
  },
  {
    type: "GarageDoorOpener",
    init: MyGarageDoorOpener
  },
  {
    type: "BlindsSimple",
    init: MyBlindsSimple
  },
  {
    type: "ThermostatSimple",
    init: MyThermostatSimple
  },
  {
    type: "LeakSensor",
    init: MyLeakSensor
  }
];
