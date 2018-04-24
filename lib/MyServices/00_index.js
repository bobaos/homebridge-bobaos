const MyFanService = require('./02_fan');
const MyGarageDoorOpener = require('./03_garageDoorOpener');
const MyLightBulbService = require('./04_lightbulb');
const MySwitchService = require('./08_switch');

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
    type: "Switch",
    init: MySwitchService
  },
  {
    type: "GarageDoorOpener",
    init: MyGarageDoorOpener
  }
];