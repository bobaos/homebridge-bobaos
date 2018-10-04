const MyFanService = require("./02_Fan");
const MyGarageDoorOpener = require("./03_GarageDoorOpener");
const MyLightBulbService = require("./04_Lightbulb");
const MyRgb = require("./04_RGB");
const MyLockMechanism = require("./06_LockMechanism");
const MyOutlet = require("./07_Outlet");
const MySwitchService = require("./08_Switch");
const MyThermostatSimple = require("./09_Thermostat");
const MyAirQualitySensor = require("./10_AirQualitySensor");
const MySecuritySystem = require("./11_SecuritySystem");
const MyLeakSensor = require("./16_LeakSensor");
const MyLightSensor = require("./17_LightSensor");
const MyMotionSensor = require("./18_MotionSensor");
const MyOccupancySensor = require("./19_OccupancySensor");
const MySmokeSensor = require("./20_SmokeSensor");
const MyTemperatureSensor = require("./22_TemperatureSensor");
const MyWindow = require("./23_Window");
const MyWindowCoverting = require("./24_WindowCovering");
const MyCarboneDioxideSensor = require("./26_CarbonDioxideSensor");
const MyBlindsSimple = require("./ff_BlindsSimple");
// TODO: rest

module.exports = [
  {
    type: "Fan",
    init: MyFanService
  },
  {
    type: "GarageDoorOpener",
    init: MyGarageDoorOpener
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
    type: "LockMechanism",
    init: MyLockMechanism
  },
  {
    type: "Outlet",
    init: MyOutlet
  },
  {
    type: "ThermostatSimple",
    init: MyThermostatSimple
  },
  {
    type: "AirQualitySensor",
    init: MyAirQualitySensor
  },
  {
    type: "SecuritySystem",
    init: MySecuritySystem
  },
  {
    type: "Switch",
    init: MySwitchService
  },
  {
    type: "LeakSensor",
    init: MyLeakSensor
  },
  {
    type: "BlindsSimple",
    init: MyBlindsSimple
  },
];
